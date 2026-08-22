---
title: Anima SN-Copy LoRA — locked recipe and product
tags:
  - anima
  - lora
  - comfyui
created: 2026-08-22
updated: 2026-08-22
status: active
type: reference
layer: library
ctx_session: cursor 721a7ba5
ctx_event: 6f714987-340e-729a-8bfc-9e0fb0136909
---

# Anima SN-Copy LoRA

Anima Base の全画面 Depth 化と、同じ骨格での画風軸。global skill にはしない。固有名とパスが再開に必要である。

## Judgment

主成果物は SN-Copy15 Difference Strength 0.8 である。コピー機 SVD45（約39時間）は品質の上限として残し、日常の再実行対象ではない。SN-Copy28、ΔG 再学習、完成 LoRA の三方式マージ、BigSlider の主軸化はしない。

方法は共有ノイズの短尺コピー機である。各ペアを Original と変換先で個別過学習し、変換先 1.0 から Original 側へ DS を掛けて引き、複数差分を等比率 SVD する。推論 weight の符号反転は逆方向の代用にしない。学習した逆（Gray に対する Chroma の逆、プレートに対する Original の逆）を別にマージする。例外は SN-Chroma7 の weight -1 だけで、低彩度側へ寄ったが学習逆の代用にはしない。

画風は SN-Copy7（asset000〜006）で方向を取る。15 ペア化は全軸の SN7 を見た追記があるまでしない。ソース Original と Depth は上書きしない。プレートは別フォルダへ置く。

比較生成の固定条件は Classroom Girl、Anima-base、seed 42、1536×1536。常用 weight は 0.7 と 1。weight 2 は強い寄せの診断。weight 4 は崩壊域なので新規に出さない。

設計は Cursor、GPU 実装は Codex。commit と push は人間が明示したときだけ。学習方法が既存ランナーで足りる長時間ジョブは、先頭 1 ペアで通ることを確認したあとスケジュールに任せ、エージェントは GPU を監視し続けない。

## Recipe

| 項目 | 値 |
|------|-----|
| ベース | Anima Base v1.0 |
| 対象 | `networks.lora_anima`、DiT のみ（`train_llm_adapter=False`） |
| 過学習 | 共有ノイズ seed 42、1024 bucket、rank 64 / alpha 1、CAME、LR 1.6e-4、50 step、空キャプション |
| 差分 | 正側 1.0、負側 −DS。採用 DS は 0.8 |
| 統合 | 7 本または 15 本を等比率、SVD rank 64 |
| 1 本の実測 | 約 2.7〜2.8 分 |
| SN-Copy7 両側 14 本 | 42.68 分 |
| SN-Copy15（7 本再利用＋追加 8 ペア） | 累計 91.26 分。DS 0.8 再マッチは学習なし 10.66 分 |

Original 過学習は SN-Copy7 で一度作れば、Turbo / Gray / RGB / 画風プレートの負側に再利用する。画素 SHA が学習時 Original と一致しない資産だけ作り直す。

## Style plates（2026/08/22 確定）

原稿は `sn-copy-style-plates`。学習は SN-Copy7、正逆、DS 0.8。第17節。

| 軸 | 正 / 逆 | ファイル | 要点 |
|----|---------|----------|------|
| 線画 | SN-Line7 / SN-Unline7 | lineart_dodge.png | ドッジ中 |
| 2値 | SN-Bin7 / SN-Unbin7 | bin_union_otsu.png | Otsu 黒とドッジ黒の論理和 |
| フラット | SN-Flat7 / SN-Unflat7 | flat.png | 下塗り面 |
| 8色 | SN-Pal8-7 / SN-Unpal8-7 | palette8.png | |
| 色トーン 65% | SN-Tone7 / SN-Untone7 | tone_over65.png | 8色の同色相縞を Original に不透明度 0.65 |
| 4色 / 6色 | Pal4 / Pal6 | palette4.png / palette6.png | 12色は不採用 |
| 線なし | SN-Lineless7 / SN-Relines7 | lineless.png | |
| 極小発光 中 | SN-BloomL7 / SN-UnbloomL7 | bloom_mid.png | 面発光と混ぜない |
| 面発光 中 | SN-BloomA7 / SN-UnbloomA7 | bloom_area_mid.png | |
| Depth フォグ | SN-Fog7 / SN-Defog7 | depthfog.png | bright = near |
| メタル | SN-Metal7 / SN-Unmetal7 | metal_mix.png | 6色 0.55 と銀反射 0.45 |

色トーンは黒ハッチではない。平坦化のあと k-means 8、肌（高輝度・低彩度）は面のまま、同色相の明暗ペアで角度付き縞を載せ、Original へ 65% 合成する。2値の単純閾値（t80 / t110 / 適応）は軸にしない。

12 軸フルの壁時計は約 5 時間（新規過学習 84 本）。1 軸は約 25 分。

## Do not repeat

次は時間を回収できなかったか、主成果物を弱くした。

- 39 時間コピー機の再実行
- ΔG-LoRA V2（約 2 時間 45 分）と `lora_up` 再スケール。係数不足ではなく、15 ペア平均後の方向が再スケールで救えない
- ADDIFT と Visual Concept Slider 単体（各約 27 分）。薄い
- 三方式ハイブリッド（Slider + SN-Copy + ADDIFT）。安いが SN-Copy 単体より弱い
- 新学習 5 方式の残差ゲート（ResCAME / ModLoRA / Styleσ / LateDiT は不通過。BigSlider ゲートは構図崩壊）
- BigSlider B1（LR 5e-5、150 step）以外の BigSlider 延長。B1 は雰囲気変化に近く、チャンピオンではない
- LateSN / ModSN。Depth は出ても構図が落ちる
- SN-Copy28。7→15 より増分が小さい延長
- 推論 weight −1 を逆 LoRA の代わりにする（SN-Copy / Turbo / D2T は格子または布目へ崩壊）
- ソース Original / Depth / 確定プレート PNG の上書き

## Compare protocol

新しい軸でも Classroom / Anima-base / seed 42 / 1536 を動かさない。ベース weight 0 と SN-Copy15 DS 0.8 の weight 0.7 / 1 は再生成しない。通過は正方向 weight 1 でそのプレートの変化が見え、逆方向 weight 1 で Original 側へ戻り、人物 1 名と机と窓が残ること。1 軸の失敗でスケジュール全体を止めない。

## What changed

2026-08-22 時点で、Depth の常用 LoRA は SN-Copy15 DS 0.8 に固定した。同じ骨格が Turbo / 彩度 / RGB / 画風プレートでも方向を取れる。画風 12 軸は原稿確定済み。第17節のスケジュールランナーは 2026/08/22 21:25 に起動済み（先頭 lineart / asset000 のゲート通過後）。

## Unresolved

第17節 12 軸の完走と目視。完走後も主成果物は SN-Copy15 DS 0.8 のままである。15 ペア化は追記があるまでしない。

## Restart

1. ComfyUI queue と `D:\Obsidian\temp\anima_dg_lora_progress.md` を見る。第17節のランナーが生きていれば GPU ジョブを二重起動しない。
2. SoT は `D:\Obsidian\Anima_dG-LoRA_Codex実装指示.md` 第17節。パラメータ年表は `D:\Obsidian\Anima_LoRA_学習・生成パラメータ記録.md`。
3. Python は `D:\AI\sd-scripts\venv\Scripts\python.exe`。学習実装は `D:\AI\sd-scripts-anima\`。ランナーは `D:\AI\sd-scripts\` の `run_anima_sncopy_*.ps1`。
4. Depth 主成果物は `sn-copy15` の DS 0.8 SVD。画風は `sn-copy7-style-axes\`。既存 `sn-copy7-axes\`（Turbo / Gray / RGB）は上書きしない。

## Out of scope

cursorsetup の global skill へは昇格しない。Anima と Classroom 固定条件とローカルパスに依存する。2 案件で名前を剥がせる手順になったときだけ `maintain-global-skill` を検討する。
