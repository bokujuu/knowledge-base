---
title: Do not regenerate an existing workbook to add queries
tags:
  - excel
  - powerquery
created: 2026-07-03
updated: 2026-08-20
status: active
type: reference
layer: library
ctx_event: 7fe81116-b931-7aac-9eb9-551398ba1f1f
---

# Existing vs new workbook

## Judgment

**Existing** `.xlsx`: insert queries only (COM `Queries.Add`). Do not re-run a "create subset workbook" generator. Regeneration wipes memos and manual query edits.

**New** file: a generator script is fine. Mark that script as new-file-only in a one-line comment.

Connection-only workbooks: no sheet QueryTable load unless asked. Column prune in M (all-identical or all-blank) belongs in the **project** query set, not here.

## Related

- [excel-com-ribbon.md](excel-com-ribbon.md)
- [power-query.md](power-query.md)
