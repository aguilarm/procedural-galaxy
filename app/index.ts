import Engine from './engine/index';

const canvasEl = document.getElementById('game') as HTMLCanvasElement | null;
const containerEl = document.getElementById(
  'gameContainer',
) as HTMLDivElement | null;

if (canvasEl === null || containerEl === null) {
  throw new Error('Failed to find mount points!');
}

const engine = new Engine(canvasEl, containerEl);
engine.init();
