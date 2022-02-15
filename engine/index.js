import {alea as prng} from "../_snowpack/pkg/seedrandom.js";
import {debounce} from "../_snowpack/pkg/lodash.js";
import {InputEngine} from "./inputEngine.js";
import Star from "./entities/Star.js";
import {GRID_SIZE, FPS, MOVE_SPEED} from "./constants.js";
class Game {
  constructor(canvas, container, seed) {
    this.galaxyOffset = {
      x: 0,
      y: 0
    };
    this.handleResize = () => {
      this.updateCanvasSize();
      this.clearCanvas();
      this.redraw();
    };
    this.loop = (lastUpdateTime) => {
      if (performance.now() - lastUpdateTime < 1e3 / FPS) {
        requestAnimationFrame(() => this.loop(lastUpdateTime));
        return;
      }
      if (this.inputEngine.activeDirections.up) {
        this.galaxyOffset.y = this.galaxyOffset.y - MOVE_SPEED;
      }
      if (this.inputEngine.activeDirections.down) {
        this.galaxyOffset.y = this.galaxyOffset.y + MOVE_SPEED;
      }
      if (this.inputEngine.activeDirections.right) {
        this.galaxyOffset.x = this.galaxyOffset.x + MOVE_SPEED;
      }
      if (this.inputEngine.activeDirections.left) {
        this.galaxyOffset.x = this.galaxyOffset.x - MOVE_SPEED;
      }
      this.redraw();
      requestAnimationFrame(() => this.loop(performance.now()));
    };
    console.log("Constructing engine with seed: " + seed + " and this canvas and container: ", canvas, container);
    this.canvas = canvas;
    this.containerElement = container;
    this.seed = seed || "default";
    this.inputEngine = new InputEngine();
  }
  get seed() {
    return this._seed;
  }
  set seed(seed) {
    seed = seed.toString();
    this.seededPRNG = prng(seed);
    this._seed = seed;
  }
  get canvas() {
    return this._canvas;
  }
  set canvas(canvas) {
    this._canvas = canvas;
    const context2D = canvas.getContext("2d");
    if (!context2D) {
      throw new Error("Failed to load 2d context!");
    }
    this.context2D = context2D;
  }
  get gridsX() {
    return this.canvas.width / 16;
  }
  get gridsY() {
    return this.canvas.height / 16;
  }
  clearCanvas() {
    this.context2D.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context2D.fillStyle = "black";
    this.context2D.lineWidth = 2;
    this.context2D.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
  updateCanvasSize() {
    this.canvas.width = this.containerElement.offsetWidth;
    this.canvas.height = this.containerElement.offsetHeight;
  }
  redraw() {
    this.clearCanvas();
    const currentGrid = {x: 0, y: 0};
    const {gridsX, gridsY, context2D, galaxyOffset} = this;
    for (currentGrid.x = 0; currentGrid.x < gridsX; currentGrid.x++) {
      for (currentGrid.y = 0; currentGrid.y < gridsY; currentGrid.y++) {
        const seedX = currentGrid.x + galaxyOffset.x;
        const seedY = currentGrid.y + galaxyOffset.y;
        const seed = (seedX & 65535) << 16 | seedY & 65535;
        const starRandGenerator = prng(seed.toString() + this._seed);
        const isStar = starRandGenerator() < 0.05;
        if (!isStar)
          continue;
        const starCenterX = currentGrid.x * GRID_SIZE + GRID_SIZE / 2;
        const starCenterY = currentGrid.y * GRID_SIZE + GRID_SIZE / 2;
        const star = new Star(starCenterX, starCenterY, starRandGenerator);
        star.draw(context2D);
        if (Math.floor(this.inputEngine.mousePos.x / 16) === currentGrid.x && Math.floor(this.inputEngine.mousePos.y / 16) === currentGrid.y) {
          star.outline(context2D);
        }
      }
    }
  }
  init() {
    console.log("Initializing engine loop...");
    this.updateCanvasSize();
    this.clearCanvas();
    window.addEventListener("resize", debounce(this.handleResize, 500));
    this.redraw();
    this.loop(performance.now());
  }
}
export default Game;
