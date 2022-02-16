import {debounce} from "../_snowpack/pkg/lodash.js";
export default class InputEngine {
  constructor() {
    this.activeDirections = {
      up: false,
      down: false,
      right: false,
      left: false
    };
    this.mouseDown = false;
    this.mousePos = {
      x: 0,
      y: 0
    };
    this.handleKeyDown = (event) => {
      switch (event.code) {
        case "KeyW":
        case "ArrowUp":
          this.activeDirections.up = true;
          break;
        case "KeyS":
        case "ArrowDown":
          this.activeDirections.down = true;
          break;
        case "KeyA":
        case "ArrowLeft":
          this.activeDirections.left = true;
          break;
        case "KeyD":
        case "ArrowRight":
          this.activeDirections.right = true;
          break;
        default:
          return;
      }
    };
    this.handleKeyUp = (event) => {
      switch (event.code) {
        case "KeyW":
        case "ArrowUp":
          this.activeDirections.up = false;
          break;
        case "KeyS":
        case "ArrowDown":
          this.activeDirections.down = false;
          break;
        case "KeyA":
        case "ArrowLeft":
          this.activeDirections.left = false;
          break;
        case "KeyD":
        case "ArrowRight":
          this.activeDirections.right = false;
          break;
        default:
          return;
      }
    };
    this.handleMouseMove = (event) => {
      this.mousePos.x = event.pageX;
      this.mousePos.y = event.pageY;
    };
    this.handleMouseUp = () => {
      this.mouseDown = false;
    };
    this.handleMouseDown = () => {
      this.mouseDown = true;
    };
    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keyup", this.handleKeyUp);
    document.addEventListener("mouseup", this.handleMouseUp);
    document.addEventListener("mousedown", this.handleMouseDown);
    document.addEventListener("mousemove", debounce(this.handleMouseMove, 10));
  }
}
