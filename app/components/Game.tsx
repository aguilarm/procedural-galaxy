import React, { useEffect, useRef } from 'react';
import Engine from '../engine/index';

const Game: React.FC = () => {
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const containerEl = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!canvasEl.current || !containerEl.current) {
      throw new Error('Failed to initialize canvas!');
    }
    const engine = new Engine(canvasEl.current, containerEl.current);
    setTimeout(() => {
      engine.init();
    }, 0);
  }, []);
  return (
    <div ref={containerEl} style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden'}}>
      <canvas ref={canvasEl} />
    </div>
  );
};

export default Game;
