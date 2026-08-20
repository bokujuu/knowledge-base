---
title: ctx vs this library
tags:
  - ai
  - ctx
created: 2026-08-20
updated: 2026-08-20
status: active
type: reference
layer: library
---

# ctx vs this library

## Judgment

| Tool | Answers |
|------|---------|
| [ctxrs/ctx](https://github.com/ctxrs/ctx) | What happened in a past session (transcript, tool calls) |
| This repo | What we decided to reuse next time |
| Agent "memory" MCP | Optional facts; can go stale; not a substitute for git notes |

Search with `ctx search --term "..."` then `ctx show event <id> --window 8`. Distill into a library note. Do not paste the transcript.

Local install on this machine: `ctx.exe` under `%USERPROFILE%\.local\bin`, data in `%USERPROFILE%\.ctx`. `ctx setup` if the index is empty.

## Related

- [why-github.md](why-github.md)
