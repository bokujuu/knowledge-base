---
title: Weekly Review PR Policy
tags:
  - ai
  - automation
  - reference
created: 2026-06-17
updated: 2026-06-17
status: active
type: reference
summary: 週次レビュー Automation が PR で行ってよい変更の範囲
---

# PR Policy

週次レビュー Automation の **PR は必須の成果物** です。ログだけで終えないこと。

## Branch / PR

| 項目 | 規約 |
|------|------|
| Branch | `cursor/weekly-review-YYYY-MM-DD` |
| Title | `review: weekly knowledge-base review YYYY-MM-DD` |
| Base | `main` |
| Draft | 可（初回試用時は draft 推奨でもよい） |

## 必須で含めるファイル

| ファイル | 内容 |
|----------|------|
| `docs/ai/reviews/YYYY-MM-DD-weekly-review.md` | 週次レビュー報告（正本） |

## 追加してよい変更

| 種類 | 例 | 条件 |
|------|-----|------|
| 索引更新 | `docs/ai/reviews/README.md` にリンク追加 | 新規レビューファイル作成時 |
| 索引更新 | `docs/_index.md` の Related | 必要時のみ |
| ノートへの追記 | Related Notes にレビューへのリンク | 非破壊 |
| ノートの front matter | `updated` 日付、`status: review` | 意味がある場合のみ |
| リンク修正 | 触ったファイル間の相対リンク | 明らかな誤りのみ |
| repo 基盤 | `docs/ai/automations/` の参照パス修正 | レビューで判明した場合 |
| Open Questions | `[ ]` → `[x]` | **ノート本文に決定が書いてある場合のみ** |

## 禁止

- 既存本文の削除・大幅な書き換え
- 未決論点を勝手に結論づける
- フォルダ構成の大規模変更
- 仕様書（`knowledge-base-repo-setup.md`）の無断変更
- 秘密情報・個人識別情報の追加
- `archive/` への移動（人間の明示指示がある場合を除く）

## PR 本文に必須のセクション

1. **Summary** — 今週の要点
2. **Review report** — 報告書へのリンク
3. **Changes in this PR** — 変更一覧と理由
4. **Top 3 for human decision** — 人間が今週決めるべき3件
5. **Proposals deferred** — 今回入れなかった提案
6. **Trial-phase notes** — Automation としての所見

## マージ後の想定

人間が PR を読み、Top 3 について:

- 決定 → 該当ノートに反映（次回レビューで `[x]` 化しうる）
- 保留 → Open Questions のまま
- 方針変更 → 新しい Open Question を追加

## Cursor Automation Tools

| Tool | 設定 |
|------|------|
| Pull request creation | **ON（必須）** |
| Memories | ON 推奨（過去の試用所見を引き継ぐ） |
| Send to Slack | 任意 |
| MCP | 不要（標準で足りる） |

## Related

- [output-template.md](output-template.md)
- [trial-context.md](trial-context.md)
