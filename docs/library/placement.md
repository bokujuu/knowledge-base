---
title: Placement — global skill vs repo vs library
tags:
  - ai
  - cursor
created: 2026-08-20
updated: 2026-08-20
status: active
type: reference
layer: library
ctx_session: cursor 07d7a973 (excelkensakusystem skill placement); terra on Power Query global skill
---

# Placement

## Judgment

| Kind | Put it |
|------|--------|
| Tone, output shape, min-diff | cursorsetup `user-rules/` (Settings paste; not git-synced) |
| Procedure reused across repos, names stripped | cursorsetup `skills/` |
| Excel COM, book paths, query names | The **project** `AGENTS.md` / `.cursor/skills/` |
| Why we chose that, failures, comparisons | This library |

User Rules that encode AHK or COM policy were a dead end. Domain stays in the repo that owns the files.

Power Query **tools** stay in the PQ repo. Global skill is orchestration only, not a replacement for COM/lint.

Excel formula/COM skills are **project** skills, not `~/.cursor/skills/`.

## Skill vs command vs subagent

Skills are capability loaded when relevant. Slash commands are fixed runbooks. Subagents get a fresh context. Hooks only nudge; they do not replace skills.

## Related

- cursorsetup `docs/review/global-suitability-and-knowledge-capture.md`
- [agent-layers.md](agent-layers.md)
