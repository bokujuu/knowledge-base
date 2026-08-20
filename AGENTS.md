# AGENTS.md

This repository is the **library**: reusable judgments for the next agent session.

Do not load the whole tree. Read [docs/desk.md](docs/desk.md) and follow one reconnect link.

Global Cursor/Codex procedures live in [bokujuu_cursorsetup](https://github.com/bokujuu/bokujuu_cursorsetup). This repo is not User Rules.

## Rules

1. Prefer small Markdown notes with YAML `layer: desk | library | inbox | case`.
2. Do not grow this file. Add a desk line or a library note.
3. Do not delete library notes; mark `status: outdated` if wrong.
4. No secrets, tokens, or confidential third-party data.
5. One-off discoveries go to `docs/inbox/`. Promote after a second observation ([docs/promotion-ledger.md](docs/promotion-ledger.md)).
6. Skill promotion (cursorsetup) only after two cases and names stripped.

## Commands

```bash
python3 scripts/python/weekly_review_scan.py
```

## Maintenance

Follow [.cursor/skills/maintain-knowledge-base/SKILL.md](.cursor/skills/maintain-knowledge-base/SKILL.md).
