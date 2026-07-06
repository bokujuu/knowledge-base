import motionCanvasPlugin from '@motion-canvas/vite-plugin';
import {defineConfig} from 'vite';

const motionCanvas =
  typeof motionCanvasPlugin === 'function'
    ? motionCanvasPlugin
    : (motionCanvasPlugin as {default: typeof motionCanvasPlugin}).default;

export default defineConfig({
  plugins: [
    motionCanvas({
      project: './src/project.ts',
    }),
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    host: true,
    port: 5174,
    strictPort: true,
  },
});
