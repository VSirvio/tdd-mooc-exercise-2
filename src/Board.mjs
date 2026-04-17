export class Board {
  width;
  height;
  currentBlockLocation;
  gameArea;

  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.gameArea = new Array(this.height);
    for (let y = 0; y < this.height; ++y) {
      this.gameArea[y] = new Array(this.width);
      for (let x = 0; x < this.width; ++x) {
        this.gameArea[y][x] = '.';
      }
    }
  }

  toString() {
    let result = '';
    for (let y = 0; y < this.height; ++y) {
      for (let x = 0; x < this.width; ++x) {
        if (this.currentBlockLocation && x === this.currentBlockLocation[0] &&
            y === this.currentBlockLocation[1]) {
          result += 'X';
        } else {
          result += this.gameArea[y][x];
        }
      }
      result += "\n";
    }
    return result;
  }

  drop(block) {
    if (this.currentBlockLocation) {
      throw Error('already falling');
    }

    this.currentBlockLocation = [1, 0];
  }

  tick() {
    if (this.currentBlockLocation) {
      this.currentBlockLocation[1] += 1;
    }
  }

  hasFalling() {
    return this.currentBlockLocation !== undefined;
  }
}
