import { alea as Alea } from 'seedrandom';
import { debounce, isEqual } from 'lodash';

// get random number between a and b inclusive, ie (a <= x <= b)
function __randomIntFromInterval(min, max, rand) {
  return Math.floor(rand() * (max - min + 1)) + min;
}

type RandomGenerator = () => number;

const STAR_COLORS = [
  '#FFFFFF',
  '#FFFFFF',
  '#FFFFFF',
  '#FFFFFF',
  '#FFFFFF',
  '#FFAF65',
  '#FFC189',
  '#EA913F',
  '#FFC565',
  '#FFE3B4',
  '#FF8C65',
  '#FFC7B4',
  '#FFA789',
  '#EA6B3F',
  '#C8471A',
];

class Star {
  private rand: RandomGenerator;
  private color: string;
  private radius: number;
  private pos: {
    x: number,
    y: number,
  }

  constructor(posX, posY, starRandGenerator) {
    this.rand = starRandGenerator;
    const initSeed = this.rand();
    this.color = STAR_COLORS[__randomIntFromInterval(0, STAR_COLORS.length-1, this.rand)];
    this.radius = __randomIntFromInterval(1, 8, this.rand);
    this.pos = {
      x: posX,
      y: posY
    }
  }

  public draw(context2D: CanvasRenderingContext2D) {
    context2D.fillStyle = this.color;
    context2D.beginPath();
    context2D.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
    context2D.fill();
    context2D.closePath();
  }
}

const SECTOR_SIZE = 16;
const MOVE_SPEED = 1;



class Game {
  private _seed: string | number;
  private _canvas: HTMLCanvasElement;
  private context2D: CanvasRenderingContext2D;
  private rand: RandomGenerator;
  private galaxyOffset = {
    x: 0,
    y: 0,
  }
  private activeInputs = {
    up: false,
    down: false,
    left: false,
    right: false,
  }

  get seed() {
    return this._seed;
  }

  set seed(seed) {
    this.rand = new Alea(seed);
    this._seed = seed;
  }

  get canvas() {
    return this._canvas;
  }

  set canvas(canvas: HTMLCanvasElement) {
    this._canvas = canvas;
    this.context2D = canvas.getContext('2d');
  }

  get sectorsX() {
    return this.canvas.width/16;
  }

  get sectorsY() {
    return this.canvas.height/16;
  }

  private clearCanvas() {
    this.context2D.clearRect(0,0,this.canvas.width,this.canvas.height);
    this.context2D.fillStyle = 'black';
    this.context2D.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private updateCanvasSize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  private redraw() {
    this.clearCanvas();
    const currentSector = { x: 0, y: 0 };
    const {
      sectorsX,
      sectorsY,
      context2D,
      galaxyOffset
    } = this;
    for (currentSector.x = 0; currentSector.x < sectorsX; currentSector.x++) {
      for (currentSector.y = 0; currentSector.y < sectorsY; currentSector.y++) {
        const seedX = currentSector.x + galaxyOffset.x;
        const seedY = currentSector.y + galaxyOffset.y;
        const seed = (seedX & 0xFFFF) << 16 | (seedY & 0xFFFF);
        const starRandGenerator = new Alea(seed.toString());
        const isStar = starRandGenerator() < 0.05;
        if (!isStar) continue;
        const starCenterX = (currentSector.x) * SECTOR_SIZE + SECTOR_SIZE/2;
        const starCenterY = (currentSector.y) * SECTOR_SIZE + SECTOR_SIZE/2;
        const star = new Star(starCenterX, starCenterY, starRandGenerator);
        star.draw(context2D);
      }
    }
  }


  private handleResize = () => {
    this.updateCanvasSize();
    this.clearCanvas();
    // Reset rand() to start of sequence
    this.seed = this.seed;
    this.redraw();
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    switch(event.code) {
      case 'KeyW':
        this.activeInputs.up = true;
        break;
      case 'KeyS':
        this.activeInputs.down = true;
        break;
      case 'KeyA':
        this.activeInputs.left = true;
        break;
      case 'KeyD':
        this.activeInputs.right = true;
        break;
      default:
        return;
    }
  }
  
  private handleKeyUp = (event: KeyboardEvent) => {
    switch(event.code) {
      case 'KeyW':
        this.activeInputs.up = false;
        break;
      case 'KeyS':
        this.activeInputs.down = false;
        break;
      case 'KeyA':
        this.activeInputs.left = false;
        break;
      case 'KeyD':
        this.activeInputs.right = false;
        break;
      default:
        return;
    }
  }

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.seed = 'thisisrandomaf';
  }

  public init() {
    this.updateCanvasSize();
    this.clearCanvas();
    window.addEventListener('resize', debounce(this.handleResize, 200));
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
    this.redraw();
    this.loop();
  }

  private loop = () => {
    const startOffset = { ...this.galaxyOffset };
    if (this.activeInputs.up) {
      this.galaxyOffset.y = this.galaxyOffset.y - MOVE_SPEED;
    }
    if (this.activeInputs.down) {
      this.galaxyOffset.y = this.galaxyOffset.y + MOVE_SPEED;
    }
    if (this.activeInputs.right) {
      this.galaxyOffset.x = this.galaxyOffset.x + MOVE_SPEED;
    }
    if (this.activeInputs.left) {
      this.galaxyOffset.x = this.galaxyOffset.x - MOVE_SPEED;
    }
    if (!isEqual(startOffset, this.galaxyOffset)) {
      this.redraw();
    }
    requestAnimationFrame(this.loop);
  }

}

const canvas = document.getElementById("game") as HTMLCanvasElement;
const game = new Game(canvas);
game.init();