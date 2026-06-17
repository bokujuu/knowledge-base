---
title: Cursor Automations — Weekly Review
tags:
  - ai
  - cursor
  - automation
  - procedure
created: 2026-06-17
updated: 2026-06-17
status: active
type: procedure
summary: Cursor Automations で週次未決事項レビューを回すための設定とプロンプト
---

# Cursor Automations — Weekly Review

試用フェーズで「未決・議論余地のある事項」を週1回確認するための **Cursor Automations** 設定です。

> **注意:** これは GitHub Actions とは別物です。  
> GitHub Actions = リポジトリ内の YAML workflow（PR #3 の案）  
> Cursor Automations = Cursor ダッシュボードで設定する Cloud Agent の定期実行

## 何が違うか

| | Cursor Automations | GitHub Actions（PR #3） |
|--|-------------------|-------------------------|
| 設定場所 | cursor.com/automations / Cursor IDE の Agents Window | `.github/workflows/*.yml` |
| 実行主体 | Cursor Cloud Agent（AI） | 固定スクリプト |
| できること | 読解・要約・判断・PR 作成・Slack 通知など | 決められた処理のみ（Issue 自動作成など） |
| 課金 | Cloud Agent 利用量（Max Mode 固定） | GitHub Actions 分数 |
| 向いている用途 | 「未決事項を見て、何を確認すべきか整理してほしい」 | 「毎週同じ機械的チェックを回す」 |

**想定に合うのは Cursor Automations です。** GitHub Actions は代替案として残すか、PR #3 はマージしない選択で問題ありません。

## 必要な前提

1. **Cursor アカウント** — Cloud Agents / Automations が使えるプラン
2. **GitHub 連携** — Cursor Settings で GitHub を接続済み
3. **リポジトリアクセス** — `bokujuu/knowledge-base` を Cloud Agent が clone できること（Private repo なら権限付与）
4. **（任意）Slack 連携** — 通知を Slack に飛ばしたい場合

追加の API key や repo 内 Secrets は **基本不要**です（Cursor 側の GitHub OAuth で足ります）。

## 作成手順

### 1. Automation を新規作成

- [cursor.com/automations](https://cursor.com/automations) を開く  
  または Cursor IDE → **Agents Window** → **New Automation**

### 2. Trigger（トリガー）

| 項目 | 値 |
|------|-----|
| Type | **Scheduled** |
| Schedule | Weekly（プリセット）または cron |

週1・日曜 09:00 JST にする場合の cron（UTC）:

```text
0 0 * * 0
```

（UTC 日曜 00:00 = JST 日曜 09:00）

### 3. Repository（リポジトリ）

| 項目 | 値 |
|------|-----|
| Scope | **Single repository** |
| Repository | `bokujuu/knowledge-base` |
| Branch | `main` |

スケジュールトリガーはデフォルトで repo なしになりやすいので、**必ず single repo を明示**してください。

### 4. Tools（任意）

用途に応じて有効化:

| Tool | 用途 |
|------|------|
| **Memories** | 過去のレビュー結果を次回に引き継ぐ（デフォルト ON） |
| **Send to Slack** | 週次サマリを Slack チャンネルへ |
| **MCP server** | GitHub Issue 作成など（必要なら） |
| Pull request creation | 通常は **オフ**（レビューだけなら変更不要） |

### 5. Model / Permissions

- Model: お好み（長文 Markdown 読解なら十分なコンテキストのモデル）
- Permissions: **Private**（個人利用）で可
- Billing: Automations は Max Mode 固定（Cloud Agent 課金）

### 6. 初回テスト

保存後 **Run now** で手動実行し、Agents Window で結果を確認してからスケジュールを有効化します。

## プロンプト（コピペ用）

Automation の Instructions に以下を貼り付けてください。必要に応じて調整します。

```markdown
# Weekly knowledge-base review

`bokujuu/knowledge-base` の試用フェーズにおける未決・議論余地のある事項を確認してください。

## 読むもの

- AGENTS.md
- docs/_index.md
- docs/research/github-knowledge-limits.md
- `.cursor/skills/maintain-knowledge-base/SKILL.md`
- `docs/` 配下の Markdown 全般（必要な範囲のみ）

## 探すもの

運用方針に限らず、次のいずれかに該当する項目:

1. `## Open Questions` / `## 未決` / `## 検討中` 配下の未チェック `- [ ]`
2. front matter の `status: draft` または `status: review`
3. タグ `needs-discussion` / `undecided`
4. 本文中で「未決」「要検討」「TBD」と明記されている論点

`docs/_templates/` と `archive/` は対象外。

## やること

1. 上記をスキャンし、未決事項を一覧化する
2. 各項目について「何を決める必要があるか」を1行で要約する
3. 優先度（高/中/低）を付ける
4. ユーザーが今週確認すべきトップ3を提案する

## やらないこと

- ノート本文の勝手な書き換え
- PR の作成（明示指示がない限り）
- 未決事項の削除

## 出力形式

```markdown
# Weekly Review YYYY-MM-DD

## サマリ（2〜3文）

## 未決事項一覧

| 優先度 | ファイル | 論点 | 提案アクション |
|--------|----------|------|----------------|
| ... | ... | ... | ... |

## 今週確認すべきトップ3

1. ...
2. ...
3. ...

## メモ（試用フェーズの観察）

- 運用モデル（保管庫 / 外部記憶 / AI参照）に関する論点があれば記載
```

結果は Automation の実行ログに残してください。Slack 連携を有効にしている場合は、同内容を要約して送信してください。
```

## ノート側の書き方（Automation が拾いやすい印）

| 書き方 | 例 |
|--------|-----|
| `## Open Questions` + `- [ ]` | `- [ ] 主目的は保管庫か外部記憶か` |
| `status: review` | front matter で要確認を明示 |
| タグ `needs-discussion` | ノート全体が議論対象 |

## ローカル補助（任意）

機械的な事前スキャンだけ欲しい場合は、次も使えます（Cursor とは独立）:

```bash
python3 scripts/python/weekly_review_scan.py
```

## 試用の進め方

1. 迷った論点をノートの `## Open Questions` に書く
2. 週1回 Automation を Run（のちスケジュール化）
3. 出力を見て「決める / 保留 / ノートに反映」
4. 2〜4 週間後にプロンプト・頻度・Slack 通知の要否を見直す

## Related Notes

- [weekly-review-automation.md](weekly-review-automation.md) — GitHub Actions 版（代替案）
- [cursor-integration.md](cursor-integration.md)
- [github-knowledge-limits.md](../research/github-knowledge-limits.md)

## References

- [Cursor Docs — Automations](https://cursor.com/docs/cloud-agent/automations)
- [cursor.com/automations](https://cursor.com/automations)
