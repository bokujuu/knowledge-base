---
title: Weekly Review Output Template
tags:
  - ai
  - automation
  - reference
created: 2026-06-17
updated: 2026-06-17
status: active
type: reference
summary: 週次レビュー報告書 docs/ai/reviews/ のテンプレート
---

# Output Template

週次レビューの正本ファイル `docs/ai/reviews/YYYY-MM-DD-weekly-review.md` は次の形式に従う。

## ファイル名

```text
docs/ai/reviews/2026-06-17-weekly-review.md
```

- 日付は JST の `YYYY-MM-DD`
- 同じ日に再実行する場合は `-2` サフィックス（例: `2026-06-17-weekly-review-2.md`）を検討し、PR 本文に理由を書く

## テンプレート

```markdown
---
title: Weekly Review YYYY-MM-DD
tags:
  - ai
  - review
  - automation
created: YYYY-MM-DD
updated: YYYY-MM-DD
status: active
type: index
summary: 週次未決事項レビュー（試用フェーズ）
---

# Weekly Review YYYY-MM-DD

## Summary

（2〜3文。今週の未決事項の全体像と、試用フェーズとしての観察）

## Open items

| 優先度 | ファイル | 論点 | 提案アクション |
|--------|----------|------|----------------|
| 高 | `docs/research/...` | ... | 人間が今週決める / 次週に持ち越し / ノートに追記提案 |

優先度の目安:

- **高** — 試用の方向性に直結、または放置すると迷いが増える
- **中** — 整理するとよいが急がない
- **低** — 観察・メモレベル

## Top 3 for human decision

1. ...
2. ...
3. ...

## Duplicates / related topics

（複数ファイルにまたがる論点、統合候補）

## Proposals

（今回 PR に含めなかった repo 基盤・ノート改善案）

- [ ] ...

## Changes in this PR

（この週の PR で実際に行った変更の要約。PR 本文と整合させる）

## Automation observations

（検出しやすかった / しづらかった、次回 Automation への改善案）

## Next week

（次回レビューまでに人間がやるとよいこと、1〜3件）
```

## front matter

- `type: index` — 週次レビュー一覧の1エントリとして扱う
- `summary` — 1行で今週の焦点

## 索引への反映

新規作成時、`docs/ai/reviews/README.md` に行を追加する（PR 内で実施可）。
