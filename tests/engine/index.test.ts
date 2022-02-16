import Engine from '../../app/engine/index';
import InputEngine from '../../app/engine/InputEngine';

describe('Engine', () => {
  document.body.innerHTML = `
    <div id="gameContainer">
      <canvas id="game"></canvas>
    </div>
  `;
  const canvasEl = document.getElementById('game') as HTMLCanvasElement;
  const containerEl = document.getElementById(
    'gameContainer',
  ) as HTMLDivElement;

  const engine = new Engine(canvasEl, containerEl, 'test');
  it('should initialize', () => {
    expect(engine).toBeInstanceOf(Engine);
    expect(engine.canvas).toBeInstanceOf(HTMLCanvasElement);
    expect(engine.containerElement).toBeInstanceOf(HTMLDivElement);
    expect(engine.seed).toEqual('test');
    expect(engine.inputEngine).toBeInstanceOf(InputEngine);
  });
});
