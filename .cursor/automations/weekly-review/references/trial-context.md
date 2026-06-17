---
title: Trial Phase Context
tags:
  - ai
  - automation
  - reference
created: 2026-06-17
updated: 2026-06-17
status: active
type: reference
summary: knowledge-base 試用フェーズの前提。週次レビュー Automation が読む文脈
---

# Trial Phase Context

週次レビュー Automation が前提とする文脈です。

## 現在のフェーズ

**試用（trial）** — 運用モデルは未確定。構想を固める前に、実際のノート追加と週次振り返りで方向性を詰める。

## リポジトリの役割

| 置くもの | 置かないもの |
|----------|--------------|
| ノート・調査・手順・参考資料 | アプリケーションコード |
| 試用中の未決論点（Open Questions） | Cursor グローバル設定（→ bokujuu_cursorsetup） |

## 運用モデル候補（未決）

レビューで議論しうる枠組み。**Automation は決めつけない。**

| モデル | 説明 |
|--------|------|
| A. 長期保管庫 | 後で見返す価値のある知識だけ |
| B. 作業の外部記憶 | 調査中・検討中のメモを育てる |
| C. AI 参照セット | Cursor 作業時に `@Files` で渡す知識 |

現状の Open Questions は [github-knowledge-limits.md](../../../docs/research/github-knowledge-limits.md) を参照。

## 週次レビューの目的

1. **未決事項の可視化** — 運用に限らず、議論余地のある論点を一覧化
2. **PR で報告** — レビュー文書 + 許可された小さな整備
3. **試用の学習** — 何が検出しやすく、何が溜まりやすいかを記録

## 報告の正本

各週のレビュー報告の正本は:

```text
docs/ai/reviews/YYYY-MM-DD-weekly-review.md
```

PR はその報告書を届ける手段であり、人間がマージして履歴に残す。

## 既知の未決（起点）

`docs/research/github-knowledge-limits.md` の Open Questions を必ず確認すること。

## Related

- [detection-rules.md](detection-rules.md)
- [pr-policy.md](pr-policy.md)
- [output-template.md](output-template.md)
