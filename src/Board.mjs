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

    const currentBlock = this.currentBlock.toString().trim().split("\n");
    const currentBlock2 = this.currentBlock.to2DArray();

    const screenContent = composeOver(
      currentBlock2 || currentBlock,
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
      const currentBlock = this.currentBlock.toString().trim().split("\n");

      let blockHeight = currentBlock.length;
      while (blockHeight > 0 && currentBlock[blockHeight - 1].match(/^[.]+$/)) {
        --blockHeight;
      }

      if (y === this.height - blockHeight ||
          !this.gameArea[y + blockHeight].join('').match(/^[.]+$/)) {

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
    if (this.currentBlockLocation[0] > 0) {
      this.currentBlockLocation[0] -= 1;
    }
  }
}
