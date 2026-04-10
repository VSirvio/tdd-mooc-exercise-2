export class Board {
  width;
  height;
  currentBlockLocation;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  toString() {
    let result = '';
    for (let y = 0; y < this.height; ++y) {
      for (let x = 0; x < this.width; ++x) {
        if (this.currentBlockLocation && x === this.currentBlockLocation[0] &&
            y === this.currentBlockLocation[1]) {
          result += 'X';
        } else {
          result += '.';
        }
      }
      result += "\n";
    }
    return result;
  }

  drop(block) {
    this.currentBlockLocation = [1, 0];
  }

  tick() {
    if (this.currentBlockLocation) {
      this.currentBlockLocation[1] += 1;
    }
  }
}
