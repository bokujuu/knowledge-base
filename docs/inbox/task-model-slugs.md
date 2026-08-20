---
title: Task tool model slugs vs chat UI
tags:
  - cursor
  - models
created: 2026-08-20
updated: 2026-08-20
status: draft
type: note
layer: inbox
ctx_session: cursor cc388e49 (2026-07-19)
---

# Task tool model slugs vs chat UI

## Summary

The parent agent's `Task` `model` allow-list is not the same as the chat model picker. On 2026-07-19 the Grok slug on that path was `cursor-grok-4.5-high` only. `cursor-grok-4.5-low` was absent. That does not mean Grok Low does not exist in the product UI.

## Details

Verify the current allow-list before claiming a model is unavailable. Prices and slugs go stale; do not copy dollar estimates into the desk.

Routing policy (Grok vs Composer) lives in cursorsetup `docs/model-routing.md`, not here.

## Related Notes

- cursorsetup `docs/model-routing.md`
