import revideoPlugin from '@revideo/vite-plugin';
import {defineConfig} from 'vite';

const revideo =
  typeof revideoPlugin === 'function'
    ? revideoPlugin
    : (revideoPlugin as {default: typeof revideoPlugin}).default;

export default defineConfig({
  plugins: [
    revideo({
      project: './src/project.ts',
    }),
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    host: true,
    port: 5175,
    strictPort: true,
  },
});
