import {Circle, Line, Rect, Txt, makeScene2D} from '@revideo/2d';
import {all, createRef, easeInOutCubic, waitFor} from '@revideo/core';

export default makeScene2D(function* (view) {
  view.fill('#05070b');

  const badge = createRef<Rect>();
  const badgeText = createRef<Txt>();
  const bar = createRef<Rect>();
  const pulse = createRef<Circle>();
  const connector = createRef<Line>();

  view.add(
    <>
      <Rect
        ref={badge}
        width={320}
        height={42}
        radius={12}
        fill="#182033"
        stroke="#6ea8ff"
        lineWidth={2}
        y={-130}
        opacity={0}
      />
      <Txt
        ref={badgeText}
        text="Revideo · pipeline render API"
        fill="#d8e7ff"
        fontFamily="IBM Plex Sans JP, sans-serif"
        fontSize={22}
        fontWeight={600}
        y={-130}
        opacity={0}
      />
      <Rect
        ref={bar}
        width={40}
        height={18}
        radius={8}
        fill="#6ea8ff"
        x={-120}
        y={20}
        opacity={0}
      />
      <Line
        ref={connector}
        points={[
          [-80, 20],
          [80, -10],
        ]}
        stroke="#8ef0c5"
        lineWidth={4}
        opacity={0}
      />
      <Circle ref={pulse} size={110} fill="#ff9ad5" y={-10} opacity={0} />
    </>,
  );

  yield* all(badge().opacity(1, 0.5), badgeText().opacity(1, 0.5));

  yield* all(bar().opacity(1, 0.4), connector().opacity(1, 0.4), pulse().opacity(1, 0.4));

  yield* all(
    bar().width(260, 1.0, easeInOutCubic),
    bar().position.x(0, 1.0, easeInOutCubic),
    pulse().scale(1.25, 1.0, easeInOutCubic),
  );

  yield* waitFor(0.35);

  yield* all(
    bar().width(40, 0.8, easeInOutCubic),
    bar().position.x(-120, 0.8, easeInOutCubic),
    pulse().scale(1, 0.8, easeInOutCubic),
    badgeText().text('renderVideo(job) → MP4', 0.4),
  );

  yield* waitFor(0.35);
});
