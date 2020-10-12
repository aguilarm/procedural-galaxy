import { alea as Alea } from 'seedrandom';

// get random number between a and b inclusive, ie (a <= x <= b)
function __randomIntFromInterval(min, max, rand) {
  return Math.floor(rand() * (max - min + 1) + min);
}

function drawStarField(canvas: HTMLCanvasElement, rand) {
  const context2D = canvas.getContext('2d');
  const start = Date.now();
  for (let x = 0; x < canvas.width; x++) {
    for (let y = 0; y < canvas.height; y++) {
      const roll = __randomIntFromInterval(0, 100, rand);
      const isStar = roll < 5;
      context2D.fillStyle = isStar ? 'white' : 'black';
      context2D.fillRect(x, y, 1, 1);
    }
  }
  console.log('took ', Date.now() - start, ' ms', canvas.width, canvas.height);
}

(function init() {
  const canvas = document.getElementById("game") as HTMLCanvasElement;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const generator = new Alea('thisisrandomaf');

  drawStarField(canvas, generator);

  document.addEventListener('keyup', event => {
    switch(event.code) {
      case 'Space':
        const newGenerator = new Alea(Date.now());
        drawStarField(canvas, newGenerator);
        break;
      default:
        return;
    }
  })

})();