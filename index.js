import Engine from "./engine/index.js";
console.log("Script registered, booting engine...");
const canvasEl = document.getElementById("game");
const containerEl = document.getElementById("gameContainer");
if (canvasEl === null || containerEl === null) {
  throw new Error("Failed to find mount points!");
}
const engine = new Engine(canvasEl, containerEl);
engine.init();
