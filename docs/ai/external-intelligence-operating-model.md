---
title: 外部知能の運用モデル（机と書庫）
tags:
  - ai
  - github
  - cursor
  - reference
created: 2026-08-20
updated: 2026-08-20
status: active
type: reference
layer: library
source_session: ctx search knowledge-base / Decision-OS 2026-08-20
summary: 常時読む入口は小さく、再利用判断は knowledge-base、手順化は cursorsetup
---

# 外部知能の運用モデル（机と書庫）

## 判断

knowledge-base は「メモ置き場」ではなく、次のチャットが必要なときだけ戻る書庫である。常時コンテキストに載せるのは [desk.md](../desk.md) と各 repo の短い `AGENTS.md` だけにする。

モデルの重みは触らない。残すのは判断・失敗・証拠・再接続先である。

## 根拠（過去セッション）

`ctx` で拾った実運用:

- 2026-07-03: Excel RibbonX の予防知は knowledge-base PR（例: [#11](https://github.com/bokujuu/knowledge-base/pull/11)、[#12](https://github.com/bokujuu/knowledge-base/pull/12)）。cursorsetup 側は skill 本文に手順を増やさず参照を足した。
- 2026-06: コード repo に調査メモを混ぜない、という分離は [github-knowledge-limits.md](../research/github-knowledge-limits.md) に既にある。未決だった「主目的」は、本ノートで **AI が再接続できる外部判断層** と定める。
- `retrospective-codify` は cursorsetup から退役済み。後任はグローバル skill `capture-external-intelligence`（先に書庫、昇格は後）。

## 流れ

仕事 → 構造や失敗を見つける → `inbox` ノート → 別案件でも観測 → `library` → 手順として安定したら cursorsetup の skill。

## global にしない理由

案件名・特定ブック・特定 CLI の操作手順は global skill に入れない。抽象できた判断基準だけ昇格する。

## 出典

- [Shin / Decision-OS（2026-08-19）](https://x.com/DecisionOS/status/2089901014711509439) — 机を小さく、書庫を大きく。因果（外部知能 → キャッシュ率）は未証明のまま参考にする。
- [ctxrs/ctx](https://github.com/ctxrs/ctx) — 圧縮メモリではなく、元セッションの検索。

## Related Notes

- [desk.md](../desk.md)
- [promotion-ledger.md](../promotion-ledger.md)
- [bokujuu-cursorsetup-integration.md](bokujuu-cursorsetup-integration.md)
