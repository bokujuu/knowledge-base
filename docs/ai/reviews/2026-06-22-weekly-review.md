---
title: Weekly Review 2026-06-22
tags:
  - ai
  - review
  - automation
created: 2026-06-22
updated: 2026-06-22
status: active
type: index
summary: 試用フェーズ第2回週次レビュー — 未決4件継続、初回PR未マージ、新規ノート3件
---

# Weekly Review 2026-06-22

## Summary

試用フェーズ第2回の週次レビューです。`docs/research/github-knowledge-limits.md` の Open Questions 4 件は前週から未変更で、運用モデルに関する論点が中心のままです。一方、6/17〜6/18 に personal / ai 向けノートが 3 件マージされ、リポジトリの実利用が始まっています。前週 Automation が作成した `cursor/weekly-review-2026-06-17` の PR は `main` に未マージのため、週次レビュー報告の正本がまだ履歴に残っていません。本 PR で 2026-06-22 報告を届けつつ、索引と関連リンクを整備します。

## Open items

| 優先度 | ファイル | 論点 | 提案アクション |
|--------|----------|------|----------------|
| 高 | `docs/research/github-knowledge-limits.md` | knowledge-base の主目的はどれに近いか（長期保管庫 / 作業の外部記憶 / AI 参照セット） | **人間が今週決める** — 第2週も未決。以降の移行・索引方針の根幹 |
| 高 | `docs/research/github-knowledge-limits.md` | 週次レビュー Automation + PR 報告の運用で十分か | **人間が今週決める** — 初回 PR 未マージも含め、PR マージ運用を決める |
| 中 | `docs/research/github-knowledge-limits.md` | 既存の散在メモがあれば、カテゴリに沿って移行 | 主目的決定後に棚卸しノート（draft）を 1 本作成 |
| 中 | `docs/research/github-knowledge-limits.md` | よく使うプロジェクトは Multi-root Workspace で knowledge-base を追加 | 主目的が「AI 参照セット」寄りなら優先度を上げる |
| 中 | `docs/ai/automations/weekly-review-setup.md` / `.codex/automation-registry.json` | cron 表記 `0 0 * * 0`（日曜）と実 Automation `0 0 * * 1`（月曜）の不一致 | 採用曜日を決め、setup・registry・Cursor UI を揃える |
| 中 | `docs/ai/reviews/` | 2026-06-17 週次レビュー PR が `main` 未マージ | マージするか破棄し本報告を正とするか人間が判断 |
| 低 | `docs/ai/ryo-lu-closer-to-material-judgment.md` | 英語原文の安定した公開 URL が未確認（本文記載） | 見つかれば References に追記。Open Questions 化は任意 |
| 低 | `docs/technology/` | powerquery 等の技術ノートは未作成（README のみ） | 移行・追加時にフォルダを育てる |
| 低 | `docs/work/` | 業務ノートは README のみ | 移行論点と連動 |

優先度の目安:

- **高** — 試用の方向性に直結、または放置すると迷いが増える
- **中** — 整理するとよいが急がない
- **低** — 観察・メモレベル

## Top 3 for human decision

1. **knowledge-base の主目的** — 長期保管庫 / 作業の外部記憶 / AI 参照セットのどれ（または組み合わせ）に寄せるか。2 週連続未決のため、試用の次の一手が止まっている。
2. **週次レビュー PR のマージ運用** — 初回（2026-06-17）PR をマージするか、本 PR（2026-06-22）を正とするか。Automation 成果物を履歴に残す手順を決める。
3. **散在メモの移行方針** — 移行対象の有無と優先カテゴリ。personal に英語・精神論メモが増え始めたため、移行元（Obsidian・別 repo 等）の有無を棚卸しするか判断する。

## Duplicates / related topics

| 論点 | 関連ファイル | メモ |
|------|--------------|------|
| 運用モデル A/B/C | `.cursor/automations/weekly-review/references/trial-context.md` ↔ `github-knowledge-limits.md` Open Q1 | 前週と同様。主目的決定後に limits を更新する形が自然 |
| Multi-root Workspace | `docs/ai/cursor-integration.md` ↔ `github-knowledge-limits.md` Open Q4 | integration は手順済み、limits は未決のまま |
| 週次レビュー仕組み | `weekly-review-setup.md`, `pr-policy.md`, 本報告, 未マージの 2026-06-17 PR | Open Q2 と PR マージ運用が連動 |
| cron ドリフト | `weekly-review-setup.md`, `.codex/automation-registry.json`, Cursor Automation UI | リポジトリ単体では実設定が分からない。前週から持ち越し |

## Proposals

- [ ] 2026-06-17 週次レビュー PR をマージするかクローズし、報告正本の扱いを一本化する
- [ ] `weekly-review-setup.md` と `.codex/automation-registry.json` の cron を実際の Automation 設定（現状 `0 0 * * 1`）に合わせて更新する
- [ ] 主目的が決まったら `github-knowledge-limits.md` の Interpretation に 1 段落追記し、該当 Open Question を `[x]` 化
- [ ] 移行対象メモの棚卸し用に `docs/research/memo-migration-inventory.md`（`status: draft`）を作成
- [ ] Multi-root を採用する場合、`docs/technology/cursor-multi-root-workspace.md` に `.code-workspace` 例を置く
- [ ] 未決論点が増えたら `status: review` または `needs-discussion` タグを利用（検出精度向上）
- [ ] `docs/personal/learning/english-meeting-bad-knowhow.md` は試用の「テスト運用」ノート — 運用モデル決定後に personal / work の境界を再確認

## Changes in this PR

- `docs/ai/reviews/2026-06-22-weekly-review.md` — 第2回週次レビュー報告（正本）
- `docs/ai/reviews/README.md` — 報告一覧に今週分のリンクを追加
- `docs/research/github-knowledge-limits.md` — Related Notes に週次レビュー報告一覧へのリンクを追加

## Automation observations

**検出しやすかった:**

- `## Open Questions` 配下の `- [ ]` — `weekly_review_scan.py` で確実に 4 件検出
- `status: draft` / `review`、`needs-discussion` タグ — 実ノートには依然未使用（テンプレのみ）。誤検出なし
- 前週報告（未マージブランチ）との diff — `git log main --since` で新規マージノート 3 件を把握

**検出しづらかった / 今回の学び:**

- **未マージ PR の存在** — リポジトリ内スキャンだけでは前週 Automation 成果が `main` に無いことに気づきにくい。`git fetch` + リモートブランチ確認が必要
- cron ドリフト — trigger 情報は Automation 実行コンテキストにのみあり、repo 内ドキュメントは前週のまま日曜表記
- Priority B（本文「未確認」「要検討」）— `ryo-lu-closer-to-material-judgment.md` の URL 未確認は手動読取で発見。機械スキャン対象外
- 新規ノートに Open Questions セクションが無い — 追加された知識はすべて `status: active` で確定扱い

**次回 Automation への改善案:**

- Memories に「未マージの `cursor/weekly-review-*` ブランチを毎回確認」を追記
- 報告書に「前週からの diff（マージされたノート・未解決 OQ）」セクションをテンプレートに常設化する案
- `weekly_review_scan.py` に `--git-since DATE` で新規マージファイル一覧を出すオプション追加を検討

## Next week

1. Top 3（主目的・PR マージ運用・移行方針）について PR コメントまたはノートに決定を書く
2. cron 表記を実設定と揃える（採用曜日を決めてから）
3. 新しい未決が出たら該当ノートに `## Open Questions` を追加 — スキャンで拾える状態を維持
