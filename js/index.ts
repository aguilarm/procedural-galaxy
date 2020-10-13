import { alea as Alea } from 'seedrandom';
import { debounce } from 'lodash';

// get random number between a and b inclusive, ie (a <= x <= b)
function __randomIntFromInterval(min, max, rand) {
  return Math.floor(rand() * (max - min + 1)) + min;
}

type RandomGenerator = () => number;

function drawStarField(canvas: HTMLCanvasElement, rand: RandomGenerator) {
  const context2D = canvas.getContext('2d');
  const start = Date.now();
  for (let x = 0; x < canvas.width; x++) {
    for (let y = 0; y < canvas.height; y++) {
      const isStar = rand() < 0.005;
      if (!isStar) continue;
      const starGen = new Alea(x+y);
      context2D.fillStyle = starGen() < 0.01 ? 'coral' : 'white';
      context2D.fillRect(x, y, 1, 1);
    }
  }
  console.log('took ', Date.now() - start, ' ms', canvas.width, canvas.height);
}

function drawCircularStarField(canvas: HTMLCanvasElement, rand: RandomGenerator) {
  const context2D = canvas.getContext('2d');
  const start = Date.now();
  for (let x = 0; x < canvas.width; x++) {
    for (let y = 0; y < canvas.height; y++) {
      const isStar = rand() < 0.001;
      if (!isStar) continue;
      const starSeed = x + y + '';
      const starRnd = new Alea(starSeed);
      context2D.fillStyle = starRnd() < 0.1 ? 'coral' : 'blue';
      const starSize = __randomIntFromInterval(1, 15, starRnd);
      context2D.beginPath();
      context2D.arc(x, y, starSize, 0, 2 * Math.PI);
      context2D.fill();
      context2D.closePath();
    }
  }
  console.log('took ', Date.now() - start, ' ms', canvas.width, canvas.height);
}

class Star {
  private _seed: string;
  private rand: RandomGenerator;
  private color: string;
  private radius: number;
  private posX: number;
  private posY: number;

  get seed() {
    return this._seed;
  }

  set seed(newSeed) {
    this.rand = new Alea(newSeed);
    this._seed = newSeed;
  }

  constructor(posX, posY) {
    this.seed = [posX,posY].join('');
    const initSeed = this.rand();
    this.color = initSeed < 0.1 ? 'coral' : 'white';
    this.radius = __randomIntFromInterval(1, 8, this.rand);
    this.posX = posX;
    this.posY = posY;
  }

  public draw(context2D: CanvasRenderingContext2D) {
    context2D.fillStyle = this.color;
    context2D.beginPath();
    context2D.arc(this.posX + 8, this.posY + 8, this.radius, 0, 2 * Math.PI);
    context2D.fill();
    context2D.closePath();
  }
}

class Game {
  private _seed: string | number;
  private _canvas: HTMLCanvasElement;
  private context2D: CanvasRenderingContext2D;

  private rand: RandomGenerator;

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
    this.context2D.fillStyle = 'black';
    this.context2D.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private updateCanvasSize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  private redraw(newSeed?: number | string) {
    this.clearCanvas();
    const currentSector = { x: 0, y: 0 };
    this.seed = newSeed || this.seed;
    const {
      sectorsX,
      sectorsY,
      rand,
      context2D
    } = this;
    for (currentSector.x = 0; currentSector.x < sectorsX; currentSector.x++) {
      for (currentSector.y = 0; currentSector.y < sectorsY; currentSector.y++) {
        const isStar = rand() < 0.05;
        if (!isStar) continue;
        const star = new Star(currentSector.x * 16, currentSector.y * 16);
        star.draw(context2D);
      }
    }
  }


  private handleResize = () => {
    console.log('handle resize');
    this.updateCanvasSize();
    this.clearCanvas();
    // Reset rand() to start of sequence
    this.seed = this.seed;
    this.redraw();
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    const {
      canvas,
      rand
    } = this;
    switch(event.code) {
      case 'Digit1':
        this.clearCanvas();
        drawStarField(canvas, rand);
        break;
      case 'Digit2':
        this.clearCanvas();
        drawCircularStarField(canvas, rand);
        break;
      case 'KeyR':
        this.redraw(Date.now());
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
    this.redraw();
  }

}

const canvas = document.getElementById("game") as HTMLCanvasElement;
const game = new Game(canvas);
game.init();