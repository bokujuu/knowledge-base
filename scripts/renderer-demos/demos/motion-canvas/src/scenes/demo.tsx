import {Circle, Line, Txt, makeScene2D} from '@motion-canvas/2d';
import {all, createRef, easeInOutCubic, waitFor} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  view.fill('#05070b');

  const title = createRef<Txt>();
  const nodeA = createRef<Circle>();
  const nodeB = createRef<Circle>();
  const nodeC = createRef<Circle>();
  const edgeAB = createRef<Line>();
  const edgeBC = createRef<Line>();

  view.add(
    <>
      <Txt
        ref={title}
        text="Motion Canvas · yield / scene graph"
        fill="#d8e7ff"
        fontFamily="IBM Plex Sans JP, sans-serif"
        fontSize={28}
        fontWeight={600}
        y={-150}
        opacity={0}
      />
      <Line
        ref={edgeAB}
        points={[
          [-140, 40],
          [0, -60],
        ]}
        stroke="#6ea8ff"
        lineWidth={4}
        opacity={0}
      />
      <Line
        ref={edgeBC}
        points={[
          [0, -60],
          [150, 50],
        ]}
        stroke="#8ef0c5"
        lineWidth={4}
        opacity={0}
      />
      <Circle
        ref={nodeA}
        x={-140}
        y={40}
        size={72}
        fill="#6ea8ff"
        opacity={0}
      />
      <Circle
        ref={nodeB}
        x={0}
        y={-60}
        size={96}
        fill="#ff9ad5"
        opacity={0}
      />
      <Circle
        ref={nodeC}
        x={150}
        y={50}
        size={64}
        fill="#8ef0c5"
        opacity={0}
      />
    </>,
  );

  yield* title().opacity(1, 0.6, easeInOutCubic);

  yield* all(
    nodeA().opacity(1, 0.5),
    nodeB().opacity(1, 0.5),
    nodeC().opacity(1, 0.5),
  );

  yield* all(edgeAB().opacity(1, 0.4), edgeBC().opacity(1, 0.4));

  yield* all(
    nodeA().position.x(-90, 0.8, easeInOutCubic),
    nodeB().scale(1.2, 0.8, easeInOutCubic),
    nodeC().position.y(10, 0.8, easeInOutCubic),
  );

  yield* waitFor(0.4);

  yield* all(
    nodeA().position.x(-140, 0.8, easeInOutCubic),
    nodeB().scale(1, 0.8, easeInOutCubic),
    nodeC().position.y(50, 0.8, easeInOutCubic),
    title().opacity(0.35, 0.6),
  );

  yield* waitFor(0.3);
});
