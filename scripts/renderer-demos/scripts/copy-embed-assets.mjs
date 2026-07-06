import {cpSync, mkdirSync, readdirSync, rmSync, statSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(root, '..', 'public', 'embed');

function walk(dir) {
  const entries = readdirSync(dir);
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    if (statSync(fullPath).isDirectory()) {
      files.push(...walk(fullPath));
    } else {
      files.push(fullPath);
    }
  }

  return files;
}

function latestProjectBundle(distDir) {
  const projectFile = walk(distDir)
    .filter((file) => /project-.*\.js$/.test(path.basename(file)))
    .sort()
    .at(-1);

  if (!projectFile) {
    throw new Error(`No project bundle found in ${distDir}`);
  }

  return projectFile;
}

function syncDist(sourceDir, targetDir) {
  rmSync(targetDir, {recursive: true, force: true});
  cpSync(sourceDir, targetDir, {recursive: true});
  console.log(`Synced ${sourceDir} -> ${targetDir}`);
}

mkdirSync(publicDir, {recursive: true});

const motionDist = path.join(root, '..', 'demos', 'motion-canvas', 'dist');
const revideoDist = path.join(root, '..', 'demos', 'revideo', 'dist');
const motionTarget = path.join(publicDir, 'motion-canvas-dist');
const revideoTarget = path.join(publicDir, 'revideo-dist');

syncDist(motionDist, motionTarget);
syncDist(revideoDist, revideoTarget);

const motionProject = latestProjectBundle(motionTarget);
const revideoProject = latestProjectBundle(revideoTarget);

const manifest = {
  motionCanvas: `/embed/motion-canvas-dist/${path
    .relative(motionTarget, motionProject)
    .split(path.sep)
    .join('/')}`,
  revideo: `/embed/revideo-dist/${path
    .relative(revideoTarget, revideoProject)
    .split(path.sep)
    .join('/')}`,
};

writeFileSync(
  path.join(publicDir, 'manifest.json'),
  `${JSON.stringify(manifest, null, 2)}\n`,
);
console.log('Wrote embed/manifest.json', manifest);
