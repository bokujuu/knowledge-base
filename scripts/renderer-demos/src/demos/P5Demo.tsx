import {useEffect, useRef} from 'react';
import p5 from 'p5';

export function P5Demo() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) {
      return;
    }

    const sketch = (s: p5) => {
      const particles: Array<{x: number; y: number}> = [];
      const count = 90;

      s.setup = () => {
        s.createCanvas(host.clientWidth, host.clientHeight);
        s.colorMode(s.HSB, 360, 100, 100, 100);
        s.strokeCap(s.ROUND);
        for (let i = 0; i < count; i++) {
          particles.push({
            x: s.random(s.width),
            y: s.random(s.height),
          });
        }
      };

      s.draw = () => {
        s.background(220, 30, 6, 100);
        s.noFill();

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const angle = s.noise(p.x * 0.004, p.y * 0.004, s.frameCount * 0.003) * s.TWO_PI * 2;
          const vx = Math.cos(angle) * 2.2;
          const vy = Math.sin(angle) * 2.2;

          s.stroke((s.frameCount * 0.6 + i * 3) % 360, 70, 95, 55);
          s.strokeWeight(1.6);
          s.line(p.x, p.y, p.x + vx * 12, p.y + vy * 12);

          p.x += vx;
          p.y += vy;

          if (p.x < 0) p.x = s.width;
          if (p.x > s.width) p.x = 0;
          if (p.y < 0) p.y = s.height;
          if (p.y > s.height) p.y = 0;
        }

        s.noStroke();
        s.fill(0, 0, 100, 70);
        s.textSize(14);
        s.text('p5.js flow field · generative', 14, 22);
      };

      s.windowResized = () => {
        s.resizeCanvas(host.clientWidth, host.clientHeight);
      };
    };

    const instance = new p5(sketch, host);

    return () => {
      instance.remove();
    };
  }, []);

  return <div ref={hostRef} style={{width: '100%', height: '100%'}} />;
}
