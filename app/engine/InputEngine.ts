import { debounce } from 'lodash';

export default class InputEngine {
  public activeDirections = {
    up: false,
    down: false,
    right: false,
    left: false,
  };

  public mouseDown = false;

  public mousePos = {
    x: 0,
    y: 0,
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    switch (event.code) {
      case 'KeyW':
      case 'ArrowUp':
        this.activeDirections.up = true;
        break;
      case 'KeyS':
      case 'ArrowDown':
        this.activeDirections.down = true;
        break;
      case 'KeyA':
      case 'ArrowLeft':
        this.activeDirections.left = true;
        break;
      case 'KeyD':
      case 'ArrowRight':
        this.activeDirections.right = true;
        break;
      default:
        return;
    }
  };

  private handleKeyUp = (event: KeyboardEvent) => {
    switch (event.code) {
      case 'KeyW':
      case 'ArrowUp':
        this.activeDirections.up = false;
        break;
      case 'KeyS':
      case 'ArrowDown':
        this.activeDirections.down = false;
        break;
      case 'KeyA':
      case 'ArrowLeft':
        this.activeDirections.left = false;
        break;
      case 'KeyD':
      case 'ArrowRight':
        this.activeDirections.right = false;
        break;
      default:
        return;
    }
  };

  private handleMouseMove = (event: MouseEvent) => {
    this.mousePos.x = event.pageX;
    this.mousePos.y = event.pageY;
  };

  private handleMouseUp = () => {
    this.mouseDown = false;
  };

  private handleMouseDown = () => {
    this.mouseDown = true;
  };

  constructor() {
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
    document.addEventListener('mouseup', this.handleMouseUp);
    document.addEventListener('mousedown', this.handleMouseDown);
    document.addEventListener('mousemove', debounce(this.handleMouseMove, 10));
  }
}
