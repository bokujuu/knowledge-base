import {DemoCard} from './components/DemoCard';
import {HyperFramesDemo} from './demos/HyperFramesDemo';
import {ManimStyleDemo} from './demos/ManimStyleDemo';
import {P5Demo} from './demos/P5Demo';
import {PixiDemo} from './demos/PixiDemo';
import {RemotionDemo} from './demos/RemotionDemo';
import {ThreeDemo} from './demos/ThreeDemo';

const motionCanvasSrc = import.meta.env.DEV
  ? 'http://localhost:5174/player.html'
  : '/embed/motion-canvas.html';

const revideoSrc = import.meta.env.DEV
  ? 'http://localhost:5175/player.html'
  : '/embed/revideo.html';

export default function App() {
  return (
    <div className="page">
      <header className="hero">
        <p className="eyebrow">Programmatic Video · Renderer Comparison</p>
        <h1>描画エンジン比較デモ</h1>
        <p className="lead">
          前回整理した「1. 描画エンジン」それぞれのレンダラー特性が一目で分かるループプレビューです。
          MP4 書き出しは不要なので、ブラウザ上のライブ描画で比較できます。
        </p>
      </header>

      <section className="grid">
        <DemoCard
          title="Remotion"
          subtitle="React / DOM / フレームベース"
          traits={['React', 'CSS/DOM', 'interpolate', 'spring', 'Headless Chromium 書き出し']}
          description="宣言的 JSX とフレーム番号で動画を定義。Web エコシステムをそのまま使えるのが強み。"
        >
          <RemotionDemo />
        </DemoCard>

        <DemoCard
          title="HyperFrames"
          subtitle="HTML / CSS → 決定的 MP4"
          traits={['素の HTML', 'CSS アニメ', 'AI エージェント向け', 'Puppeteer キャプチャ']}
          description="見た目は普通の Web ページ。レンダ時にフレーム単位でキャプチャして MP4 化する思想。"
        >
          <HyperFramesDemo />
        </DemoCard>

        <DemoCard
          title="Motion Canvas"
          subtitle="Generator / Canvas 2D"
          traits={['yield 手続き', 'シーングラフ', 'ベクター', 'ビルトインエディタ']}
          description="ノードを手続き的に追加し、イージングを細かく制御。解説・図解アニメ向き。"
        >
          <iframe
            className="iframe-demo"
            src={motionCanvasSrc}
            title="Motion Canvas demo"
          />
        </DemoCard>

        <DemoCard
          title="Revideo"
          subtitle="Motion Canvas 系 + パイプライン API"
          traits={['renderVideo()', 'SSR', 'テンプレート', 'バッチ生成']}
          description="描画モデルは Motion Canvas 系。サーバーから render API で叩く量産パイプライン向け。"
        >
          <iframe
            className="iframe-demo"
            src={revideoSrc}
            title="Revideo demo"
          />
        </DemoCard>

        <DemoCard
          title="PixiJS"
          subtitle="WebGL 2D / スプライト"
          traits={['大量スプライト', 'フィルタ', 'ブレンド', '高密度 2D']}
          description="DOM ではなく GPU で 2D を描く。パーティクルやグリッチなど高密度表現に強い。"
        >
          <PixiDemo />
        </DemoCard>

        <DemoCard
          title="Three.js"
          subtitle="WebGL 3D"
          traits={['3D メッシュ', 'ライト', 'カメラ', 'Remotion 併用可']}
          description="3D 空間・ライティング・カメラワークが必要なときの定番。2D MV には過剰なことも。"
        >
          <ThreeDemo />
        </DemoCard>

        <DemoCard
          title="Manim"
          subtitle="Python / 数式・解説"
          traits={['LaTeX 風', '座標軸', '変形アニメ', '教育向け']}
          description="本番は Python + FFmpeg。ここではブラウザ上で Manim 的なベクター解説アニメを再現。"
        >
          <ManimStyleDemo />
        </DemoCard>

        <DemoCard
          title="p5.js"
          subtitle="クリエイティブコーディング"
          traits={['ノイズ', 'ジェネラティブ', 'sketch 思想', 'アート寄り']}
          description="仕組みを自前で書くより「描く楽しさ」重視。有機的な動きや実験的表現向き。"
        >
          <P5Demo />
        </DemoCard>
      </section>

      <footer className="footer">
        <p>
          起動: <code>cd scripts/renderer-demos && npm install && npm run dev</code>
        </p>
        <p>
          Motion Canvas / Revideo は別 Vite サーバー（5174 / 5175）を iframe で埋め込みます。
        </p>
      </footer>
    </div>
  );
}
