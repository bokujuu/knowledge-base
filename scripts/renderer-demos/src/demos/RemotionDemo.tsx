import {Player} from '@remotion/player';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

const FPS = 30;
const DURATION = 150;

function RemotionComposition() {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const orbit = spring({
    frame,
    fps,
    config: {damping: 14, stiffness: 120},
  });

  const scale = interpolate(orbit, [0, 1], [0.35, 1]);
  const angle = interpolate(frame, [0, DURATION], [0, 360]);
  const x = interpolate(orbit, [0, 1], [-120, 0]);
  const opacity = interpolate(frame % 60, [0, 20, 50, 60], [0.4, 1, 1, 0.4], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{backgroundColor: '#10131a'}}>
      <div className="remotion-badge">frame {frame}</div>
      <div
        className="remotion-orbit"
        style={{
          left: '18%',
          top: '28%',
          transform: `translate(${x}px, 0) rotate(${angle}deg) scale(${scale})`,
          opacity,
        }}
      />
      <div className="remotion-title">
        <h3>React + CSS + spring()</h3>
        <p>DOM をフレーム番号で駆動</p>
      </div>
    </AbsoluteFill>
  );
}

export function RemotionDemo() {
  return (
    <div className="remotion-shell">
      <Player
        component={RemotionComposition}
        durationInFrames={DURATION}
        compositionWidth={960}
        compositionHeight={600}
        fps={FPS}
        loop
        autoPlay
        controls={false}
        style={{width: '100%', height: '100%'}}
      />
    </div>
  );
}
