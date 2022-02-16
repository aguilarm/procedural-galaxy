import Star from '../../../app/engine/entities/Star';
import { alea as prng } from 'seedrandom';

describe('Entity:Star', () => {
  const star = new Star(0, 0, prng('star'));
  it('should initialize', () => {
    expect(star.rand).toBeDefined();
    expect(star.color).toEqual('#C8471A');
    expect(star.radius).toEqual(7);
  });
  // TODO - Test drawing. Perhaps offload actual drawing to a render engine
});
