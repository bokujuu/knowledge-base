import {Player} from '@revideo/ui';
import project from './project';

const root = document.getElementById('root');
if (!root) {
  throw new Error('Missing #root');
}

const player = new Player(project);
player.initialize();
root.append(player);
player.togglePlayback(true);
