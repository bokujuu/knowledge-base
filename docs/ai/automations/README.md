---
title: Cursor Automations Index
tags:
  - ai
  - automation
  - index
created: 2026-06-17
updated: 2026-06-17
status: active
type: index
summary: knowledge-base 向け Cursor Automations の一覧と設定入口
---

# Cursor Automations

このリポジトリで運用する Cursor Automations の索引です。

## Automations

| 名前 | 目的 | Instruction | セットアップ |
|------|------|-------------|--------------|
| weekly-review | 未決事項の週次レビュー + PR 報告 | [.cursor/automations/weekly-review/INSTRUCTIONS.md](../../.cursor/automations/weekly-review/INSTRUCTIONS.md) | [weekly-review-setup.md](weekly-review-setup.md) |

## ディレクトリ構造

```text
.cursor/automations/
  weekly-review/
    INSTRUCTIONS.md          # Cursor UI に貼るプロンプト
    references/              # Automation が読む補助資料
      trial-context.md
      detection-rules.md
      pr-policy.md
      output-template.md

docs/ai/
  automations/               # 人間向けセットアップ手順
  reviews/                   # 週次レビュー報告の正本（PR で追加）
```

## 報告の流れ

```text
Automation 実行
  → 未決事項スキャン
  → docs/ai/reviews/YYYY-MM-DD-weekly-review.md 作成
  → 許可範囲の小さな整備
  → PR 作成（必須）
  → 人間がレビュー・マージ
```

## Related

- [cursor-integration.md](../cursor-integration.md)
- [reviews/README.md](../reviews/README.md)
