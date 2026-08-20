---
title: Desk
tags:
  - index
  - ai
  - github
created: 2026-08-20
updated: 2026-08-20
status: active
type: index
layer: desk
summary: 常時読む入口。詳細は読まず、必要な書庫へ再接続する
---

# Desk

常時読むのはここまで。本文を全部コンテキストに載せない。

机（本ファイル）は小さく保つ。書庫は [bokujuu/knowledge-base](https://github.com/bokujuu/knowledge-base) の `docs/`。判断手順の実行ファイルは [bokujuu_cursorsetup](https://github.com/bokujuu/bokujuu_cursorsetup) の skills。

## まず読む

| 状況 | 開くもの |
|------|----------|
| 役割分担が分からない | [bokujuu-cursorsetup-integration.md](ai/bokujuu-cursorsetup-integration.md) |
| なぜ GitHub 上の別 repo か | [github-knowledge-limits.md](research/github-knowledge-limits.md) |
| ノートの置き場・タグ | [knowledge-base-repo-setup.md](technology/github/knowledge-base-repo-setup.md) |
| セッションの判断を残す | グローバル skill `capture-external-intelligence` |
| 既存ノートの保守 | `.cursor/skills/maintain-knowledge-base/SKILL.md` |
| 完了した仕事の再開材料 | 書庫ノートの「再開」節。無ければ OSI 的に What changed / Unresolved / Restart を書く |

## 層

| 層 | 意味 | 置き場の目安 |
|----|------|----------------|
| `desk` | 再接続トリガーだけ | 本ファイル、各フォルダ README の先頭 |
| `library` | 次の AI の判断を変えうる | `docs/ai/` `docs/technology/` `docs/work/` の安定ノート |
| `case` | 過去案件へ戻る記憶 | 固有名・PR 番号つき。`docs/ai/reviews/` や案件節 |
| `inbox` | まだ1回だけの発見 | `docs/research/` |

1回の発見は `inbox`。別案件でも再現したら `library`。手順として何度も使うなら cursorsetup の skill へ昇格（[promotion-ledger.md](promotion-ledger.md)）。

## 書かない場所

- 対象 repo の `AGENTS.md` に判断の全文を足し続けない
- Gmail・チャットログを正本にしない（控えにして、正本は git）
- cursorsetup の global skill に案件固有名を入れない

## 索引

詳細トピックは [_index.md](_index.md)。フォルダ README から入る。
