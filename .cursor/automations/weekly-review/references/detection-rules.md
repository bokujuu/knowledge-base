---
title: Weekly Review Detection Rules
tags:
  - ai
  - automation
  - reference
created: 2026-06-17
updated: 2026-06-17
status: active
type: reference
summary: 週次レビューで未決事項として検出するルール
---

# Detection Rules

週次レビュー Automation が「未決・議論余地あり」として拾う条件です。

## 優先度 A — 明示的な未決マーカー

| 条件 | 例 |
|------|-----|
| `## Open Questions` 配下の `- [ ]` | `- [ ] 主目的はどれに近いか` |
| `## 未決` / `## 未決事項` 配下の `- [ ]` | 同上 |
| `## 検討中` / `## Discussion` 配下の `- [ ]` | 同上 |
| front matter `status: draft` | 下書きノート |
| front matter `status: review` | 人間の確認待ち |
| タグ `needs-discussion` または `undecided` | ノート全体が議論対象 |

## 優先度 B — 本文・構造から推論

| 条件 | 例 |
|------|-----|
| 本文に「未決」「要検討」「TBD」「わからない」を含む見出し | `## 要検討` |
| 同一論点が複数ファイルに分散 | 運用モデルに関する重複 |
| `docs/` 内の単独 `- [ ]`（テンプレ・コードブロック外） | タスク的未完了 |
| 索引に載っていない新規 `docs/` サブフォルダ | 構造のドリフト |

## 優先度 C — repo 基盤（試用を阻害するもの）

| 条件 | 対応 |
|------|------|
| 壊れた相対リンク（触った範囲で確認） | PR で修正可 |
| `docs/ai/reviews/` に今週分が無い | 今回の主成果として作成 |
| Automation 参照パスが古い・欠落 | Proposals に記載または小修正 |

## 除外するパス

```text
docs/_templates/
archive/
docs/technology/github/knowledge-base-repo-setup.md  # 仕様書内の例示
.cursor/skills/  # メンテナンス用チェックリスト（ユーザー TODO ではない）
```

コードブロック（` ``` `）内の `- [ ]` は無視する。

## 機械スキャン（補助）

```bash
python3 scripts/python/weekly_review_scan.py
```

スクリプトは優先度 A の一部のみ検出。B・C はエージェントが読んで判断すること。

## 重複の扱い

同じ論点が複数ファイルにある場合:

1. レビュー報告書の「重複・関連」に列挙
2. 統合は **提案のみ**（人間が決めるまで両方残す）

## マーキング規約（人間・Automation 共通）

新しい未決論点をノートに書くとき:

```markdown
## Open Questions

- [ ] （論点を1行で）
```

議論が必要なノート全体:

```yaml
tags:
  - needs-discussion
status: review
```
