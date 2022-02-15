import {proceduralRandomIntFromInterval} from "../utils.js";
import {GRID_SIZE} from "../constants.js";
class Star {
  constructor(posX, posY, starRandGenerator) {
    this.COLORS = [
      "#FFFFFF",
      "#FFFFFF",
      "#FFFFFF",
      "#FFFFFF",
      "#FFFFFF",
      "#FFAF65",
      "#FFC189",
      "#EA913F",
      "#FFC565",
      "#FFE3B4",
      "#FF8C65",
      "#FFC7B4",
      "#FFA789",
      "#EA6B3F",
      "#C8471A"
    ];
    this.rand = starRandGenerator;
    this.color = this.COLORS[proceduralRandomIntFromInterval(0, this.COLORS.length - 1, this.rand)];
    this.radius = proceduralRandomIntFromInterval(1, GRID_SIZE / 2, this.rand);
    this.pos = {
      x: posX,
      y: posY
    };
  }
  draw(context2D) {
    context2D.fillStyle = this.color;
    context2D.beginPath();
    context2D.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
    context2D.fill();
    context2D.closePath();
  }
  outline(context2D) {
    context2D.strokeStyle = "yellow";
    context2D.beginPath();
    context2D.arc(this.pos.x, this.pos.y, GRID_SIZE / 2 * 1.05, 0, 2 * Math.PI);
    context2D.stroke();
    context2D.closePath();
  }
}
export default Star;
