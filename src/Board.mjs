import { SingleBlock } from "./SingleBlock.mjs";
import { composeOver, stringFrom2DArray } from "./utils.mjs";

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

    const screenContent = composeOver(
      this.currentBlock.to2DArray(),
      this.gameArea,
      this.currentBlockLocation,
    );

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
      const currentBlock = this.currentBlock.to2DArray();

      let blockHeight = currentBlock.length;
      let blockBottomMargin = 0;
      while (blockBottomMargin < currentBlock.length &&
          blockHeight > 0 && currentBlock[currentBlock.length - blockBottomMargin - 1].match(/^[.]+$/)) {
        --blockHeight;
        ++blockBottomMargin;
      }

      if (y === this.height - currentBlock.length + blockBottomMargin ||
          !this.gameArea[y + currentBlock.length - blockBottomMargin].slice(x, x + currentBlock[0].length)
            .join('').match(/^[.]+$/)) {

        this.gameArea = composeOver(
          currentBlock,
          this.gameArea,
          this.currentBlockLocation,
        );

        this.currentBlockLocation = undefined;
      } else {
        this.currentBlockLocation[1] += 1;
      }
    }
  }

  hasFalling() {
    return this.currentBlockLocation !== undefined;
  }

  moveLeft() {
    const currentBlock = this.currentBlock.to2DArray();

    let leftGap = 0;
    while (leftGap < currentBlock[0].length &&
        currentBlock.map(row => row[leftGap]).every(ch => ch === '.')) {
      ++leftGap;
    }

    if (this.currentBlockLocation[0] > -leftGap) {
      this.currentBlockLocation[0] -= 1;
    }
  }
}
