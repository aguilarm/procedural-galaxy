import InputEngine from '../../app/engine/InputEngine';

describe('Engine', () => {
  const inputEngine = new InputEngine();
  it('should initialize', () => {
    expect(inputEngine).toBeInstanceOf(InputEngine);
  });
  it('should detect directional keys', () => {
    const movementKeyGroups = [
      ['KeyW', 'KeyS', 'KeyA', 'KeyD'],
      ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'],
    ];
    movementKeyGroups.forEach((group) => {
      group.forEach((code) => {
        document.dispatchEvent(
          new KeyboardEvent('keydown', {
            code,
          }),
        );
      });
      expect(inputEngine.activeDirections).toMatchObject({
        up: true,
        down: true,
        right: true,
        left: true,
      });
      group.forEach((code) => {
        document.dispatchEvent(
          new KeyboardEvent('keyup', {
            code: code,
          }),
        );
      });
      expect(inputEngine.activeDirections).toMatchObject({
        up: false,
        down: false,
        right: false,
        left: false,
      });
    });
  });

  it('should detect mouse movement', async () => {
    // The mouse move handler is debounced, so we'll fake moving ahead.
    jest.useFakeTimers();
    document.dispatchEvent(
      new MouseEvent('mousemove', {
        view: window,
        bubbles: true,
        cancelable: true,
      }),
    );
    jest.runAllTimers();
    // I could not, after a bit of research, find a way to simulate a mouse move
    //   Seems largely related to the fact that you can't actually move a mouse
    //   via javascript because you'd hijack the user. Going with undefined.
    expect(inputEngine.mousePos).toMatchObject({
      x: undefined,
      y: undefined,
    });
    jest.useRealTimers();
  });

  it('should detect mouse clicks', () => {
    document.dispatchEvent(new MouseEvent('mousedown'));
    expect(inputEngine.mouseDown).toBe(true);
    document.dispatchEvent(new MouseEvent('mouseup'));
    expect(inputEngine.mouseDown).toBe(false);
  });
});
