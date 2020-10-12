import { alea as Alea } from 'seedrandom';

// get random number between a and b inclusive, ie (a <= x <= b)
// function __randomIntFromInterval(min, max, rand) {
//   return (rand() % (max - min)) + min;
// }

function resetCanvas(canvas: HTMLCanvasElement) {
  const context2D = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  context2D.fillStyle = 'black';
  context2D.fillRect(0, 0, canvas.width, canvas.height);
}

function drawStarField(canvas: HTMLCanvasElement, rand) {
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

(function init() {
  const canvas = document.getElementById("game") as HTMLCanvasElement;
  resetCanvas(canvas);

  const generator = new Alea('thisisrandomaf');

  drawStarField(canvas, generator);

  document.addEventListener('keyup', event => {
    switch(event.code) {
      case 'Space':
        const newGenerator = new Alea(Date.now());
        resetCanvas(canvas);
        drawStarField(canvas, newGenerator);
        break;
      default:
        return;
    }
  })

})();