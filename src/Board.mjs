import { Coord2D } from "./Coord2D.mjs";
import { SingleBlock } from "./SingleBlock.mjs";

import {
  composeOver,
  stringFrom2DArray,
  withoutBorders,
} from "./utils.mjs";


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
      this.#gameArea[y] = ['#', ...this.#gameArea[y], '#'];
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
    if (this.#currentBlockLocation === undefined) {
      return stringFrom2DArray(withoutBorders(this.#gameArea));
    }

    const screenContent = composeOver(
      this.#currentBlock.to2DArray(),
      this.#gameArea,
      this.#currentBlockLocation,
    );

    return stringFrom2DArray(withoutBorders(screenContent));
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
    this.#currentBlockLocation = new Coord2D(Math.floor((this.getWidth() - blockWidth) / 2), 0);
  }

  tick() {
    if (this.#currentBlockLocation) {
      const newLocation = this.#currentBlockLocation.movedBy(0, 1);

      if (this.#overlaps(this.#currentBlock, newLocation)) {
        this.#gameArea = composeOver(
          this.#currentBlock.to2DArray(),
          this.#gameArea,
          this.#currentBlockLocation,
        );

        this.#currentBlockLocation = undefined;
      } else {
        this.#currentBlockLocation = newLocation;
      }
    }
  }

  #overlaps(block, blockLocation) {
    const blockX = blockLocation.getX();
    const blockY = blockLocation.getY();
    const currentBlock = block.to2DArray();
    for (let y = 0; y < currentBlock.length; ++y) {
      for (let x = 0; x < currentBlock[0].length; ++x) {
        if (currentBlock[y][x] !== '.' &&
            this.#gameArea[blockY + y][blockX + x] !== '.') {
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
    const newLocation = this.#currentBlockLocation.movedBy(-1, 0);
    if (!this.#overlaps(this.#currentBlock, newLocation)) {
      this.#currentBlockLocation = newLocation;
    }
  }

  moveRight() {
    const newLocation = this.#currentBlockLocation.movedBy(1, 0);
    if (!this.#overlaps(this.#currentBlock, newLocation)) {
      this.#currentBlockLocation = newLocation;
    }
  }

  moveDown() {
    const newLocation = this.#currentBlockLocation.movedBy(0, 1);
    if (!this.#overlaps(this.#currentBlock, newLocation)) {
      this.#currentBlockLocation = newLocation;
    }
  }

  rotateRight() {
    const rotatedBlock = this.#currentBlock.rotateRight();
    if (!this.#overlaps(rotatedBlock, this.#currentBlockLocation)) {
      this.#currentBlock = rotatedBlock;
    }
  }
}
