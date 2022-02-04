import { debounce } from 'lodash';

export class InputEngine {
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
        this.activeDirections.up = true;
        break;
      case 'KeyS':
        this.activeDirections.down = true;
        break;
      case 'KeyA':
        this.activeDirections.left = true;
        break;
      case 'KeyD':
        this.activeDirections.right = true;
        break;
      default:
        return;
    }
  };

  private handleKeyUp = (event: KeyboardEvent) => {
    switch (event.code) {
      case 'KeyW':
        this.activeDirections.up = false;
        break;
      case 'KeyS':
        this.activeDirections.down = false;
        break;
      case 'KeyA':
        this.activeDirections.left = false;
        break;
      case 'KeyD':
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

  private handleMouseUp = (event: MouseEvent) => {
    this.mouseDown = false;
  };

  private handleMouseDown= (event: MouseEvent) => {
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
