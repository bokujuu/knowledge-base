# -*- coding: utf-8 -*-
"""Scan knowledge-base Markdown for open / undecided items."""

from __future__ import annotations

import argparse
import re
import sys
from dataclasses import dataclass, field
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]

SKIP_DIR_PARTS = {
    ".git",
    ".cursor",
    ".codex",
    "archive",
    "docs/_templates",
}

SKIP_FILES = {
    "docs/technology/github/knowledge-base-repo-setup.md",
}

OPEN_SECTION_HEADINGS = {
    "open questions",
    "未決",
    "未決事項",
    "検討中",
    "discussion",
    "要検討",
    "open items",
}

OPEN_STATUSES = {"draft", "review"}


@dataclass
class Finding:
    path: str
    kind: str
    detail: str
    line: int | None = None


@dataclass
class ScanReport:
    findings: list[Finding] = field(default_factory=list)

    @property
    def has_items(self) -> bool:
        return bool(self.findings)


def should_skip(path: Path) -> bool:
    rel = path.relative_to(ROOT).as_posix()
    if rel in SKIP_FILES:
        return True
    for part in SKIP_DIR_PARTS:
        if rel == part or rel.startswith(part + "/"):
            return True
    return False


def parse_front_matter(text: str) -> tuple[dict[str, str], str]:
    if not text.startswith("---\n"):
        return {}, text
    end = text.find("\n---\n", 4)
    if end == -1:
        return {}, text
    block = text[4:end]
    body = text[end + 5 :]
    meta: dict[str, str] = {}
    for line in block.splitlines():
        if ":" not in line:
            continue
        key, value = line.split(":", 1)
        meta[key.strip()] = value.strip()
    return meta, body


def scan_file(path: Path) -> list[Finding]:
    rel = path.relative_to(ROOT).as_posix()
    text = path.read_text(encoding="utf-8")
    meta, body = parse_front_matter(text)
    findings: list[Finding] = []

    status = meta.get("status", "").strip().lower()
    if status in OPEN_STATUSES:
        findings.append(
            Finding(rel, "status", f"status: {status}")
        )

    tags_raw = meta.get("tags", "")
    if "needs-discussion" in tags_raw or "undecided" in tags_raw:
        findings.append(
            Finding(rel, "tag", "tagged for discussion")
        )

    if meta.get("needs_discussion", "").lower() in {"true", "yes"}:
        findings.append(
            Finding(rel, "flag", "needs_discussion: true")
        )

    lines = body.splitlines()
    in_open_section = False
    open_section_title = ""
    in_code_fence = False

    for idx, line in enumerate(lines, start=1):
        stripped = line.strip()
        if stripped.startswith("```"):
            in_code_fence = not in_code_fence
            continue
        if in_code_fence:
            continue

        heading_match = re.match(r"^#{1,6}\s+(.+)$", stripped)
        if heading_match:
            title = heading_match.group(1).strip().lower()
            in_open_section = title in OPEN_SECTION_HEADINGS
            open_section_title = heading_match.group(1).strip() if in_open_section else ""
            continue

        checkbox_match = re.match(r"^-\s+\[\s\]\s+(.+)$", line.strip())
        if checkbox_match:
            item = checkbox_match.group(1).strip()
            if in_open_section:
                findings.append(
                    Finding(
                        rel,
                        "open_question",
                        f"[{open_section_title}] {item}",
                        idx,
                    )
                )
            elif rel.startswith("docs/"):
                findings.append(
                    Finding(rel, "unchecked", item, idx),
                )

    return findings


def scan_repo(root: Path = ROOT) -> ScanReport:
    report = ScanReport()
    for path in sorted(root.rglob("*.md")):
        if should_skip(path):
            continue
        report.findings.extend(scan_file(path))
    return report


def render_markdown(report: ScanReport, generated_date: str) -> str:
    if not report.has_items:
        return (
            f"# Weekly Knowledge-Base Review ({generated_date})\n\n"
            "未決・要確認の項目は見つかりませんでした。\n\n"
            "試用中に新しい論点が出たら、ノートに `## Open Questions` や "
            "`- [ ]`、front matter の `status: review` を付けてください。\n"
        )

    sections: dict[str, list[Finding]] = {}
    for item in report.findings:
        sections.setdefault(item.kind, []).append(item)

    kind_titles = {
        "status": "## Draft / Review のノート",
        "tag": "## 議論タグ付き",
        "flag": "## needs_discussion フラグ",
        "open_question": "## Open Questions（未チェック）",
        "unchecked": "## その他の未完了チェックボックス",
    }

    lines = [
        f"# Weekly Knowledge-Base Review ({generated_date})",
        "",
        "試用フェーズの未決事項・議論余地のある項目です。",
        "運用方針に限らず、ナレッジベース全体の論点を確認してください。",
        "",
    ]

    for kind, title in kind_titles.items():
        items = sections.get(kind, [])
        if not items:
            continue
        lines.append(title)
        lines.append("")
        for item in items:
            loc = f"{item.path}:{item.line}" if item.line else item.path
            lines.append(f"- `{loc}` — {item.detail}")
        lines.append("")

    lines.extend(
        [
            "## 次のアクション（例）",
            "",
            "- 決まったこと → ノート本文に反映し、チェックを外すか Issue を close",
            "- まだ未定 → そのまま残す（次回の週次レビューに再掲）",
            "- 新しい論点 → 該当ノートに `## Open Questions` を追加",
            "",
            "---",
            "",
            "この Issue は週次 Automation により自動作成されました。",
        ]
    )
    return "\n".join(lines)


def main() -> int:
    parser = argparse.ArgumentParser(description="Scan knowledge-base for open items")
    parser.add_argument(
        "--output",
        type=Path,
        help="Write markdown report to this file",
    )
    parser.add_argument(
        "--date",
        default="",
        help="Report date label (YYYY-MM-DD)",
    )
    args = parser.parse_args()

    report = scan_repo()
    date_label = args.date or __import__("datetime").date.today().isoformat()
    markdown = render_markdown(report, date_label)

    if args.output:
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(markdown, encoding="utf-8")
    else:
        sys.stdout.write(markdown)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
