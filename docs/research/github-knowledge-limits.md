---
title: GitHub活用の限界と knowledge-base の位置づけ
tags:
  - github
  - research
  - ai
created: 2026-06-17
updated: 2026-06-17
status: active
type: research
summary: コード用 GitHub リポジトリと知識リポジトリを分離する理由と運用方針
---

# GitHub活用の限界と knowledge-base の位置づけ

## Question

コード用 GitHub リポジトリにメモ・調査・参考資料まで載せると、何が問題になるか。どう分離すべきか。

## Background

コード用 GitHub リポジトリに、メモ・調査・参考資料まで載せ始めると次の問題が出る。

- README が肥大化し、第三者にも用途が伝わりにくくなる
- Issue / Wiki は知識の検索・再利用に向かない
- プロジェクト A の作業中に、プロジェクト B の文脈が AI コンテキストに混ざる
- 「コード」と「知識」のライフサイクルが異なるのに、同じリポジトリで管理する

## Findings

| 置き場所 | 内容 |
|----------|------|
| 各プロジェクト repo | 実装・テスト・そのプロジェクト固有の設定 |
| `knowledge-base`（本 repo） | ノート、参考資料、ドキュメント、調査、検証記録 |

リポジトリ名は `knowledge-base`。Description は気取らず、将来用途が増えても破綻しにくい表現にする。

> Personal knowledge base containing notes, references, documentation, and research.

## Interpretation

仕事・趣味・技術情報・調査メモ・AI 関連など、用途が増えても Description を書き換える必要がほぼない構成を目指す。詳細な運用仕様は [knowledge-base-repo-setup.md](../technology/github/knowledge-base-repo-setup.md) を参照。

## Open Questions

- [ ] knowledge-base の主目的はどれに近いか（長期保管庫 / 作業の外部記憶 / AI 参照セット）
- [ ] 週次レビュー Automation + PR 報告の運用で十分か
- [ ] 既存の散在メモがあれば、カテゴリに沿って移行
- [ ] よく使うプロジェクトは Multi-root Workspace で knowledge-base を追加

## Related Notes

- [cursor-integration.md](../ai/cursor-integration.md)
- [weekly-review-setup.md](../ai/automations/weekly-review-setup.md)
- [Weekly review reports](../ai/reviews/README.md) — 未決事項の週次報告
- [bokujuu-cursorsetup-integration.md](../ai/bokujuu-cursorsetup-integration.md)
- [knowledge-base-repo-setup.md](../technology/github/knowledge-base-repo-setup.md)

## References

- ChatGPT 会話「GitHub活用の限界」
