---
title: エージェントスキル評価（参照）
tags:
  - research
  - ai
  - reference
created: 2026-06-23
updated: 2026-06-23
status: active
type: research
summary: フューチャー技術ブログと codex-skill-bench の参照リンクと簡易要約。skill 評価は今後どの AI でも避けられない前提のメモ。
---

# エージェントスキル評価（参照）

自分用の参照リンク。skill を書いても効いているかは計測しないと分からない、という前提で残す。

## 参照（正本）

| 種別 | URL |
|------|-----|
| 記事 | [エージェントスキルを評価する仕組みを作ってみる（フューチャー技術ブログ, 2026-06-22）](https://future-architect.github.io/articles/20260622a/) |
| 実装 | [shibukawa/codex-skill-bench](https://github.com/shibukawa/codex-skill-bench) |
| 公式（関連） | [Testing Agent Skills Systematically with Evals（OpenAI）](https://developers.openai.com/blog/eval-skills) |
| 大規模ベンチ（関連） | [benchflow-ai/SkillsBench](https://github.com/benchflow-ai/SkillsBench) |

## 簡易要約

shibukawa 氏（フューチャー）が、**Codex の skill が本当に効いているか**を定量で見るため [codex-skill-bench](https://github.com/shibukawa/codex-skill-bench) を作った、という記事。

### なぜプロンプト評価より難しいか

- エージェントは **ワークスペース** が要る
- **skill が起動したか** 自体が評価対象
- 成果がファイル変更なら **成果物の中身** も見る必要がある  
→ 入出力ペアのプロンプト評価より一段〜二段難しい

### 比較した条件（記事内の実験）

| 条件 | 意味 |
|------|------|
| スキルなし | ベースライン |
| 暗黙的実行 | name/description からエージェントが skill を選ぶ |
| 明示的実行 | skill を指定して実行 |
| プリロード | 先に skill を読み込ませる（コスト計測用） |

### 主な結果（記事の結論）

**単純なタスク**（小さなスクリプト程度）

- 処理時間・トークンに大きな差は出ない
- 「Codex が十分賢いと、ちょっとした skill は効かない」ケースがある

**複雑なタスク**（DB 集計など手順が長いもの）

- skill ありで **トークン・時間が大きく改善** しうる
- 1 テーブルだけの集計では差が出ず、「簡単すぎると skill の価値が見えない」

**トークンの見方**

- プリロードはキャッシュトークンは増えるが、**非キャッシュトークン** はほぼ変わらないことがある
- API コストはキャッシュヒットで大きく下がる → **KPI は非キャッシュトークン** が妥当、という示唆

**暗黙的実行**

- description の書き方が悪いと、skill 探索でトークンが増えることもある

### 記事が言う「本番でやるなら」

- 1 回計測ではなく **リトライ**（非決定性への対応）
- 結果評価の **自動化**（structured output 等）
- **ゴールデン結果の保存**（モデル劣化 vs skill 変更の切り分け）
- 複数モデル・安価モデルとの比較

### codex-skill-bench のざっくり動き（MVP）

1. fixture workspace をコピー
2. 必要なら skill を `.agents/skills/` に materialize
3. Codex SDK で実行しイベントを記録
4. with-skill / no-skill など variant ごとに **トークン・時間** を YAML レポート化

※ 記事執筆時点の MVP。assertion・LLM judge・並列実行などは仕様上はあるが未実装の部分あり（README 参照）。

## このリポジトリとの関係

| 既存資産 | 関係 |
|----------|------|
| [.cursor/skills/maintain-knowledge-base/](../../.cursor/skills/maintain-knowledge-base/SKILL.md) | 手順が長くドメイン知識も多い → 記事の「複雑タスク向き」に該当しうる |
| [weekly-review Automation](../ai/automations/weekly-review-setup.md) | automation はあるが **skill 効果の計測** はまだない |
| [agent-docs-verbalization-research.md](agent-docs-verbalization-research.md) | 調査メモの置き場所・Phase 1/2 の判断枠 |

**採用は未決。** 今は「skill 評価という論点の参照」として置いている。

## Open Questions

- [ ] `maintain-knowledge-base` 向けに最小 eval（10 ケース程度）を作るか
- [ ] Codex 専用の codex-skill-bench を参考に、Cursor 向けの簡易計測をどうするか
- [ ] KPI を非キャッシュトークンにするか、accepted change 率にするか（Loop Engineering 側の指標との整合）
- [ ] SkillsBench のような外部ベンチを使うか、自前 fixture に留めるか

## Related Notes

- [agent-docs-verbalization-research.md](agent-docs-verbalization-research.md)
- [cursor-integration.md](../ai/cursor-integration.md)
- [bokujuu-cursorsetup-integration.md](../ai/bokujuu-cursorsetup-integration.md)

## References

- [エージェントスキルを評価する仕組みを作ってみる](https://future-architect.github.io/articles/20260622a/) — フューチャー技術ブログ（2026-06-22）
- [codex-skill-bench](https://github.com/shibukawa/codex-skill-bench)
- [Testing Agent Skills Systematically with Evals](https://developers.openai.com/blog/eval-skills) — OpenAI Developers
- [SkillsBench](https://github.com/benchflow-ai/SkillsBench) — 大規模 paired evaluation ベンチ（参考）
