import { SingleBlock } from "./SingleBlock.mjs";
import { stringFrom2DArray } from "./utils.mjs";

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
      return stringFrom2DArray(this.gameArea);
    }

    const currentBlock = this.currentBlock.toString().trim().split("\n");
    const [currentBlockX, currentBlockY] = this.currentBlockLocation;

    const screenContent = this.gameArea.map(row => [...row]);
    for (let y = 0; y < currentBlock.length && currentBlockY + y < screenContent.length; ++y) {
      for (let x = 0; x < currentBlock[0].length && currentBlockX + x < screenContent[y].length; ++x) {
        const character = currentBlock[y][x];
        if (character !== '.') {
          screenContent[currentBlockY + y][currentBlockX + x] = character;
        }
      }
    }

    return stringFrom2DArray(screenContent);
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
      const currentBlock = this.currentBlock.toString().trim().split("\n");

      let blockHeight = currentBlock.length;
      while (blockHeight > 0 && currentBlock[blockHeight - 1].match(/^[.]+$/)) {
        --blockHeight;
      }

      if (y === this.height - blockHeight ||
          !this.gameArea[y + blockHeight].join('').match(/^[.]+$/)) {
        for (let yIndex = 0; yIndex < currentBlock.length && y + yIndex < this.height; ++yIndex) {
          for (let xIndex = 0; xIndex < currentBlock[0].length && x + xIndex < this.width; ++xIndex) {
            const character = currentBlock[yIndex][xIndex];
            if (character !== '.') {
              this.gameArea[y + yIndex][x + xIndex] = character;
            }
          }
        }

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
