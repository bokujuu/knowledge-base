---
title: Weekly Review Automation (GitHub Actions)
tags:
  - ai
  - automation
  - github
  - procedure
created: 2026-06-17
updated: 2026-06-17
status: active
type: procedure
summary: GitHub Actions で週次未決事項を Issue にまとめる代替案（Cursor Automations とは別）
---

# Weekly Review Automation (GitHub Actions)

> **想定している運用は [cursor-automations-weekly-review.md](cursor-automations-weekly-review.md)（Cursor Automations）です。**  
> 本ドキュメントは、リポジトリ内スクリプトで機械的に Issue を作る **代替案** です。PR #3 が未マージなら採用しなくて構いません。

試用フェーズで「未決・議論余地のある事項」を週1回確認するための GitHub Actions 設定です。運用方針に限らず、ナレッジベース全体の論点を対象にします。

## 何をするか

毎週日曜 09:00 JST（UTC 日曜 00:00）に:

1. リポジトリ内の Markdown をスキャン
2. 未決事項を一覧化
3. 項目がある場合のみ GitHub Issue を自動作成

手動実行: GitHub → **Actions** → **Weekly knowledge-base review** → **Run workflow**

## GitHub 側で必要な設定

### 1. Actions を有効化

**Settings → Actions → General**

| 項目 | 推奨値 |
|------|--------|
| Actions permissions | **Allow all actions and reusable workflows**（または許可リストで `actions/*`） |
| Workflow permissions | **Read and write permissions** |
| Allow GitHub Actions to create and approve pull requests | オフで可（Issue 作成のみ） |

`GITHUB_TOKEN` は標準で付与されるため、**追加の Secrets は不要**です。

### 2. Issue 通知を受け取る

**Watch** ボタンから以下いずれかを選択:

- **All Activity** — すべての Issue 通知
- **Custom → Issues** — Issue のみ

メール通知: **Settings（個人）→ Notifications → Email** で Issue 通知をオン。

### 3. ラベル（自動作成）

初回実行時に workflow が次を自動作成します（手動作成でも可）:

| ラベル | 用途 |
|--------|------|
| `weekly-review` | 週次 Automation が作成した Issue |
| `review` | 要確認・議論余地あり |

### 4. スケジュールの注意

- Private repo でも scheduled workflow は利用可能
- 60日以上非アクティブな repo ではスケジュールが一時停止される場合あり
- 試用中は **workflow_dispatch**（手動実行）で動作確認するのが確実

### 5. 実行時刻の変更

[`.github/workflows/weekly-review.yml`](../../.github/workflows/weekly-review.yml) の `cron` を編集:

```yaml
# 例: 月曜 09:00 JST → UTC 月曜 00:00
- cron: "0 0 * * 1"
```

[cron 式は UTC](https://docs.github.com/en/actions/writing-workflows/schedule-a-workflow)。JST = UTC + 9 時間。

## ノート側の書き方（検出ルール）

Automation が拾う印:

| 方法 | 例 | 用途 |
|------|-----|------|
| `## Open Questions` 配下の `- [ ]` | 運用モデルを決める | **推奨**。議論余地のある論点 |
| `## 未決` / `## 検討中` 配下の `- [ ]` | 同上（日本語見出し可） | 同上 |
| front matter `status: draft` | 下書きノート | 未完成の記録 |
| front matter `status: review` | 要レビュー | 確認待ち |
| タグ `needs-discussion` | `tags: [needs-discussion]` | 議論が必要なノート全体 |
| `docs/` 内の単独 `- [ ]` | タスク的な未完了 | 補助的に検出 |

**検出しないもの:** `docs/_templates/`, `archive/`, `.cursor/`, セットアップ仕様書

### 記述例

```markdown
## Open Questions

- [ ] knowledge-base の主目的は A/B/C のどれに近いか
- [ ] 週次レビューは Issue 通知で十分か
```

決まったら `[x]` にするか、本文に結論を書いてチェックを外す。

## ローカルでの確認

```bash
python3 scripts/python/weekly_review_scan.py
```

## 試用フェーズの進め方

1. 運用で迷う論点を、該当ノートに `## Open Questions` で書く
2. 週次 Issue を見て「決める / 保留 / ノートに反映」を判断
3. 2〜4 週間後、検出ルールや頻度を見直す

## Related Notes

- [cursor-integration.md](cursor-integration.md)
- [github-knowledge-limits.md](../research/github-knowledge-limits.md)

## References

- [GitHub Actions — Schedule a workflow](https://docs.github.com/en/actions/writing-workflows/schedule-a-workflow)
- [knowledge-base-repo-setup.md §16.2–16.3](../technology/github/knowledge-base-repo-setup.md)
