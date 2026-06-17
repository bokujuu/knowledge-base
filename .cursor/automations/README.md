# Cursor Automations（repo 内アセット）

このディレクトリは **Cursor Automations** 用の Instruction と参照資料を置く場所です。  
設定そのものは [cursor.com/automations](https://cursor.com/automations) で行い、ここには **エージェントが読む・人がコピペする** 内容だけを置きます。

## 一覧

| Automation | Instruction | セットアップ手順 |
|--------------|-------------|----------------|
| weekly-review | [weekly-review/INSTRUCTIONS.md](weekly-review/INSTRUCTIONS.md) | [docs/ai/automations/weekly-review-setup.md](../docs/ai/automations/weekly-review-setup.md) |

## 使い方

1. Cursor Automations で New Automation を作成
2. Repository: `bokujuu/knowledge-base` / `main`
3. **Instructions** に `weekly-review/INSTRUCTIONS.md` の全文を貼る（または `@` で参照）
4. Tools: **Pull request creation** を有効化
5. Run now でテスト

## 報告の形

週次レビューは **PR** で報告します。

- レビュー本文: `docs/ai/reviews/YYYY-MM-DD-weekly-review.md`
- 必要に応じて: ノートへの小さな追記、索引更新、repo 基盤の整備

詳細: [weekly-review/references/pr-policy.md](weekly-review/references/pr-policy.md)
