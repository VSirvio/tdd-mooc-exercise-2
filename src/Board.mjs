import { SingleBlock } from "./SingleBlock.mjs";

export class Board {
  width;
  height;
  currentBlock;
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
    if (this.currentBlockLocation === undefined) {
      return this.gameArea.map(row => row.join('')).join("\n") + "\n";
    }

    const currentBlock = this.currentBlock.toString().trim().split("\n");
    const [currentBlockX, currentBlockY] = this.currentBlockLocation;

    let result = '';
    for (let y = 0; y < this.height; ++y) {
      for (let x = 0; x < this.width; ++x) {
        if (x >= currentBlockX && x < currentBlockX + currentBlock[0].length &&
            y >= currentBlockY && y < currentBlockY + currentBlock.length) {
          const character = currentBlock[y - currentBlockY][x - currentBlockX];
          if (character !== '.') {
            result += character;
            continue;
          }
        }

        result += this.gameArea[y][x];
      }
      result += "\n";
    }
    return result;
  }

  drop(block) {
    if (this.currentBlockLocation) {
      throw Error('already falling');
    }

    let blockObject = block;
    if (typeof block === 'string') {
      blockObject = new SingleBlock(block);
    }

    const blockWidth = blockObject.toString().indexOf("\n");

    this.currentBlock = blockObject;
    this.currentBlockLocation = [Math.floor((this.width - blockWidth) / 2), 0];
  }

  tick() {
    if (this.currentBlockLocation) {
      const [x, y] = this.currentBlockLocation;

      if (this.currentBlockLocation[1] === this.height - 1 ||
          this.gameArea[y + 1][x] !== '.') {
        this.gameArea[y][x] = this.currentBlock.toString().trim();
        this.currentBlockLocation = undefined;
      } else {
        this.currentBlockLocation[1] += 1;
      }
    }
  }

  hasFalling() {
    return this.currentBlockLocation !== undefined;
  }
}
