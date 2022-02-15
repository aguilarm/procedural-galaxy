// get random number between a and b inclusive, ie (a <= x <= b)
export function proceduralRandomIntFromInterval(
  min: number,
  max: number,
  rand: () => number,
) {
  return Math.floor(rand() * (max - min + 1)) + min;
}
