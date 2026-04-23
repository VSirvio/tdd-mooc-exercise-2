import { SingleBlock } from "./SingleBlock.mjs";
import { bottomMargin, composeOver, stringFrom2DArray } from "./utils.mjs";

export class Board {
  #currentBlock;
  #currentBlockLocation;
  #gameArea;

  constructor(width, height) {
    this.#gameArea = new Array(height);
    for (let y = 0; y < height; ++y) {
      this.#gameArea[y] = new Array(width);
      for (let x = 0; x < width; ++x) {
        this.#gameArea[y][x] = '.';
      }
    }
    this.#gameArea.push(new Array(width).fill('#'));
  }

  getWidth() {
    return this.#gameArea[0].length;
  }

  getHeight() {
    return this.#gameArea.length;
  }

  toString() {
    const gameAreaWithoutBorders = this.#gameArea.slice(0, -1);

    if (this.#currentBlockLocation === undefined) {
      return stringFrom2DArray(gameAreaWithoutBorders);
    }

    const screenContent = composeOver(
      this.#currentBlock.to2DArray(),
      gameAreaWithoutBorders,
      this.#currentBlockLocation,
    );

    return stringFrom2DArray(screenContent);
  }

  drop(block) {
    if (this.#currentBlockLocation) {
      throw Error('already falling');
    }

    let blockObject = block;
    if (typeof block === 'string') {
      blockObject = new SingleBlock(block);
    }

    const blockWidth = blockObject.toString().indexOf("\n");

    this.#currentBlock = blockObject;
    this.#currentBlockLocation = [Math.floor((this.getWidth() - blockWidth) / 2), 0];
  }

  tick() {
    if (this.#currentBlockLocation) {
      const [x, y] = this.#currentBlockLocation;
      const currentBlock = this.#currentBlock.to2DArray();

      let blockBottomMargin = bottomMargin(currentBlock);

      if (this.#collides(0, 1)) {
        this.#gameArea = composeOver(
          currentBlock,
          this.#gameArea,
          this.#currentBlockLocation,
        );

        this.#currentBlockLocation = undefined;
      } else {
        this.#currentBlockLocation[1] += 1;
      }
    }
  }

  #collides(dx, dy) {
    const [blockX, blockY] = this.#currentBlockLocation;
    const currentBlock = this.#currentBlock.to2DArray();
    for (let y = 0; y < currentBlock.length; ++y) {
      for (let x = 0; x < currentBlock[0].length; ++x) {
        if (currentBlock[y][x] !== '.' &&
            this.#gameArea[blockY + y + 1][blockX + x] !== '.') {
          return true;
        }
      }
    }
    return false;
  }

  hasFalling() {
    return this.#currentBlockLocation !== undefined;
  }

  moveLeft() {
    const currentBlock = this.#currentBlock.to2DArray();

    let leftGap = 0;
    while (leftGap < currentBlock[0].length &&
        currentBlock.map(row => row[leftGap]).every(ch => ch === '.')) {
      ++leftGap;
    }

    if (this.#currentBlockLocation[0] > -leftGap) {
      this.#currentBlockLocation[0] -= 1;
    }
  }
}
