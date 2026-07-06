import {useEffect, useRef} from 'react';
import {Application, Container, Graphics, Text} from 'pixi.js';

export function PixiDemo() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) {
      return;
    }

    let app: Application | null = null;
    let destroyed = false;

    const boot = async () => {
      app = new Application();
      await app.init({
        background: '#05070b',
        resizeTo: host,
        antialias: true,
        resolution: Math.min(window.devicePixelRatio, 2),
        autoDensity: true,
      });

      if (destroyed) {
        app.destroy(true);
        return;
      }

      host.appendChild(app.canvas);

      const root = new Container();
      app.stage.addChild(root);

      const particles: Graphics[] = [];
      const colors = [0x6ea8ff, 0x8ef0c5, 0xff9ad5, 0xffd27a];

      for (let i = 0; i < 220; i++) {
        const g = new Graphics();
        const size = 2 + Math.random() * 5;
        g.circle(0, 0, size).fill(colors[i % colors.length]);
        g.x = Math.random() * app.screen.width;
        g.y = Math.random() * app.screen.height;
        g.alpha = 0.35 + Math.random() * 0.65;
        root.addChild(g);
        particles.push(g);
      }

      const title = new Text({
        text: 'WebGL 2D · 220 sprites',
        style: {
          fill: '#d8e7ff',
          fontFamily: 'IBM Plex Sans JP, sans-serif',
          fontSize: 22,
          fontWeight: '600',
        },
      });
      title.x = 18;
      title.y = 16;
      root.addChild(title);

      const glitch = new Graphics();
      root.addChild(glitch);

      let tick = 0;
      app.ticker.add(() => {
        if (!app) {
          return;
        }

        tick += 1;
        const w = app.screen.width;
        const h = app.screen.height;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const speed = 0.6 + (i % 7) * 0.15;
          p.x += Math.sin(tick * 0.02 + i) * speed;
          p.y += Math.cos(tick * 0.018 + i * 0.4) * speed;
          if (p.x < -10) p.x = w + 10;
          if (p.x > w + 10) p.x = -10;
          if (p.y < -10) p.y = h + 10;
          if (p.y > h + 10) p.y = -10;
        }

        glitch.clear();
        if (tick % 48 < 4) {
          for (let band = 0; band < 5; band++) {
            const y = ((tick * 17 + band * 53) % h);
            glitch
              .rect(0, y, w, 6 + (band % 3) * 4)
              .fill({color: 0xffffff, alpha: 0.08});
          }
        }
      });
    };

    void boot();

    return () => {
      destroyed = true;
      if (app) {
        app.destroy(true);
      }
      host.replaceChildren();
    };
  }, []);

  return <div ref={hostRef} style={{width: '100%', height: '100%'}} />;
}
