# AGENTS.md

## Role of This Repository

This repository is a personal knowledge base. It contains notes, references, documentation, research, scripts, structured data, and supporting attachments.

The repository should be maintained carefully because it is intended for long-term use.

## Source of Truth

| 項目 | 場所 |
|------|------|
| リポジトリ構成・運用仕様 | [docs/technology/github/knowledge-base-repo-setup.md](docs/technology/github/knowledge-base-repo-setup.md) |
| ノート索引 | [docs/_index.md](docs/_index.md) |
| メンテナンス手順 | [.cursor/skills/maintain-knowledge-base/SKILL.md](.cursor/skills/maintain-knowledge-base/SKILL.md) |
| 週次レビュー Automation | [.cursor/automations/weekly-review/INSTRUCTIONS.md](.cursor/automations/weekly-review/INSTRUCTIONS.md) |
| 週次レビュー報告一覧 | [docs/ai/reviews/README.md](docs/ai/reviews/README.md) |
| Automation 登録簿 | [.codex/automation-registry.json](.codex/automation-registry.json) |
| Cursor グローバル設定 | [bokujuu_cursorsetup](https://github.com/bokujuu/bokujuu_cursorsetup)（別 repo） |

## General Rules for AI Agents

When editing this repository:

1. Prefer small, explicit changes.
2. Do not delete existing content unless explicitly instructed.
3. Do not overwrite notes without preserving important information.
4. Use Markdown for knowledge notes.
5. Use YAML front matter for metadata when useful.
6. Keep file names stable after creation unless renaming is clearly necessary.
7. Preserve user-written wording when possible.
8. If information appears outdated, mark it as outdated instead of deleting it.
9. When creating new files, place them in the most appropriate directory.
10. If uncertain where to place a note, place it under `docs/research/` or create a clearly named subfolder.

## Preferred File Types

Use:

- `.md` for notes and documentation
- `.csv` for simple tabular data
- `.json` for structured objects
- `.jsonl` for line-based structured records
- `.parquet` for larger analytical datasets
- `.sqlite` for relational local databases
- `.ps1` for PowerShell scripts
- `.py` for Python scripts
- `.ahk` for AutoHotKey scripts

Avoid storing proprietary or binary formats unless they are necessary as source materials.

## Markdown Front Matter

Use this format for standard notes:

```yaml
---
title: 
tags: []
created: YYYY-MM-DD
updated: YYYY-MM-DD
status: active
type: note
---
```

Recommended `status` values:

- `active`
- `draft`
- `review`
- `outdated`
- `archived`

Recommended `type` values:

- `note`
- `reference`
- `procedure`
- `research`
- `troubleshooting`
- `glossary`
- `dataset`
- `script`
- `index`

## Writing Style

Write notes clearly and directly.

Prefer:

- Short headings
- Concrete examples
- Bullet lists where useful
- Code blocks for commands or scripts
- Tables for comparisons
- Links to related notes

Avoid:

- Vague titles
- Excessive nesting
- Duplicate notes
- Unexplained abbreviations
- Tool-specific syntax that reduces portability

## Tagging Rules

Use lowercase tags.

Prefer simple tags:

```text
excel
powerquery
python
powershell
ahk
d365
crm
ai
llm
automation
github
obsidian
research
procedure
troubleshooting
reference
```

Do not create many near-duplicate tags.

Avoid:

```text
PowerQuery
power-query
power_query
pq
```

Prefer one canonical tag:

```text
powerquery
```

## Linking Rules

Use Markdown links or Obsidian-style wikilinks where useful.

Acceptable:

```markdown
[Power Query](../technology/powerquery.md)
```

Acceptable for Obsidian use:

```markdown
[[Power Query]]
```

If using wikilinks, keep file names readable and stable.

## Directory Rules

Use `docs/work/` for work-related knowledge.

Use `docs/technology/` for technical notes.

Use `docs/ai/` for AI, LLM, agent, prompt, and automation notes.

Use `docs/personal/` for personal notes and hobby-related information.

Use `docs/research/` for investigation notes and unfinished research.

Use `docs/glossary/` for definitions of terms.

Use `data/` for structured data.

Use `attachments/` for images, PDFs, and other supporting files.

Use `scripts/` for reusable scripts.

Use `archive/` for obsolete or historical content.

## Maintenance Tasks

When asked to maintain the repository, AI agents may:

- Create index files
- Normalize front matter
- Add missing tags
- Detect duplicate notes
- Move outdated files to `archive/`
- Summarize long notes
- Split overly long notes
- Create glossary entries
- Generate README files for folders
- Convert notes into structured datasets where appropriate

Follow [.cursor/skills/maintain-knowledge-base/SKILL.md](.cursor/skills/maintain-knowledge-base/SKILL.md) for standard maintenance workflows.

## Borrowed Skills (bokujuu_cursorsetup)

グローバル skill は `bokujuu_cursorsetup` を install した環境で利用可能。本 repo のメンテナンスで特に有用なもの:

| skill | 用途 |
|-------|------|
| `japanese-technical-writing` | 日本語ノートの作成・改稿 |
| `japanese-doc-review` | 日本語文書のレビュー |
| `cursor-session-doc` | 過去 Cursor セッションの要約・引き継ぎ |
| `repo-agent-bootstrap` | AGENTS.md / skill 基盤のメンテナンス |
| `agent-handoff-recovery` | セッション折り返し時の状況整理 |

## Safety and Privacy

Treat this repository as private.

Do not add secrets, passwords, API keys, tokens, personal identification numbers, or confidential third-party information unless explicitly instructed.

If a secret is detected, warn the user and recommend removing it from Git history if it has been committed.

## Commit Style

Use clear commit messages.

Examples:

```text
Add initial knowledge-base structure
Add Markdown note templates
Update tagging policy
Add Power Query reference notes
Archive outdated CRM memo
```
