import {useEffect, useRef} from 'react';

export function ManimStyleDemo() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) {
      return;
    }

    let frame = 0;
    let raf = 0;

    const animate = () => {
      frame += 1;
      const t = (frame % 240) / 240;

      const axis = svg.querySelector<SVGPathElement>('#axis');
      const curve = svg.querySelector<SVGPathElement>('#curve');
      const dot = svg.querySelector<SVGCircleElement>('#dot');
      const formula = svg.querySelector<SVGTextElement>('#formula');

      if (axis) {
        const axisLen = Math.min(1, t * 2.2);
        axis.style.strokeDasharray = '600';
        axis.style.strokeDashoffset = String(600 * (1 - axisLen));
      }

      if (curve) {
        const curveLen = Math.min(1, Math.max(0, (t - 0.25) * 1.8));
        curve.style.strokeDasharray = '800';
        curve.style.strokeDashoffset = String(800 * (1 - curveLen));
      }

      if (dot && curve) {
        const active = Math.max(0, (t - 0.55) / 0.45);
        const x = 70 + active * 260;
        const y = 190 - Math.sin(active * Math.PI * 2) * 70;
        dot.setAttribute('cx', String(x));
        dot.setAttribute('cy', String(y));
        dot.setAttribute('opacity', active > 0 ? '1' : '0');
      }

      if (formula) {
        formula.setAttribute('opacity', String(Math.min(1, Math.max(0, (t - 0.15) * 2.5))));
      }

      raf = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="manim-demo">
      <svg ref={svgRef} viewBox="0 0 400 240" role="img" aria-label="Manim style math animation">
        <rect width="400" height="240" fill="#0f1118" />
        <path
          id="axis"
          d="M60 190 H340 M200 40 V200"
          stroke="#7d879c"
          strokeWidth="2"
          fill="none"
        />
        <path
          id="curve"
          d="M70 190 C130 70, 270 310, 330 120"
          stroke="#58c4ff"
          strokeWidth="4"
          fill="none"
        />
        <circle id="dot" cx="70" cy="190" r="7" fill="#ffd27a" opacity="0" />
        <text
          id="formula"
          x="72"
          y="58"
          fill="#f4f7ff"
          fontFamily="JetBrains Mono, monospace"
          fontSize="22"
          opacity="0"
        >
          f(x) = sin(x)
        </text>
      </svg>
      <span className="manim-label">Manim-style (browser preview)</span>
    </div>
  );
}
