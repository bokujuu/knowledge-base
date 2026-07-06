# 描画エンジン比較デモ

前回整理した **1. 描画エンジン**（Remotion / HyperFrames / Motion Canvas / Revideo / PixiJS / Three.js / Manim / p5.js）の特性がブラウザ上で比較できるライブプレビュー集です。

MP4 への書き出しは行いません。レンダラーとしての「描き方・見た目・得意領域」の違いを確認する用途向けです。

## 起動

```bash
cd scripts/renderer-demos
npm install
npm run dev
```

ブラウザで http://localhost:5173 を開きます。

`npm run dev` は次を同時起動します。

| ポート | 内容 |
|--------|------|
| 5173 | 比較ハブ（メイン） |
| 5174 | Motion Canvas デモ（iframe 埋め込み） |
| 5175 | Revideo デモ（iframe 埋め込み） |

ハブだけ見る場合: `npm run dev:hub`

## 各デモの見どころ

| エンジン | プレビューで見せている特性 |
|----------|---------------------------|
| Remotion | React + `spring()` / `interpolate()`、DOM/CSS、フレーム番号表示 |
| HyperFrames | 素の HTML/CSS アニメ（キャプチャ元＝そのまま画面） |
| Motion Canvas | `yield` 手続き、シーングラフ、ベクター形状のトゥイーン |
| Revideo | MC 系描画 + パイプライン/API 想定のバッジ・プログレス表現 |
| PixiJS | 大量スプライト + グリッチ帯（WebGL 2D 密度） |
| Three.js | 3D メッシュ、ライト、カメラオービット |
| Manim | 座標軸・関数曲線・式の段階表示（ブラウザで Manim 風再現） |
| p5.js | パーリンノイズのフローフィールド（ジェネラティブ） |

## ビルド

```bash
npm run build
npm run preview
```

## 補足

- **Manim** は本番では Python 実行が必要なため、このデモは SVG アニメで雰囲気を再現しています。
- **HyperFrames** もライブラリ自体ではなく「HTML がそのままレンダ源になる」思想を CSS で表現しています。
- Motion Canvas / Revideo は公式 Vite プラグインが必要なため、サブプロジェクトとして分離しています。
