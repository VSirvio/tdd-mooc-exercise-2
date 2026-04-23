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
  #currentBlockLocation2;
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
      if (this.#collides(0, 1)) {
        this.#gameArea = composeOver(
          this.#currentBlock.to2DArray(),
          this.#gameArea,
          this.#currentBlockLocation,
        );

        this.#currentBlockLocation = undefined;
      } else {
        this.#currentBlockLocation = this.#currentBlockLocation.movedBy(0, 1);
      }
    }
  }

  #collides(dx, dy) {
    const blockX = this.#currentBlockLocation.getX();
    const blockY = this.#currentBlockLocation.getY();
    const currentBlock = this.#currentBlock.to2DArray();
    for (let y = 0; y < currentBlock.length; ++y) {
      for (let x = 0; x < currentBlock[0].length; ++x) {
        if (currentBlock[y][x] !== '.' &&
            this.#gameArea[blockY + y + dy][blockX + x + dx] !== '.') {
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
    if (!this.#collides(-1, 0)) {
      this.#currentBlockLocation = this.#currentBlockLocation.movedBy(-1, 0);
    }
  }

  moveRight() {
    if (!this.#collides(1, 0)) {
      this.#currentBlockLocation = this.#currentBlockLocation.movedBy(1, 0);
    }
  }

  moveDown() {
    if (!this.#collides(0, 1)) {
      this.#currentBlockLocation = this.#currentBlockLocation.movedBy(0, 1);
    }
  }

  rotateRight() {
    this.#currentBlock = this.#currentBlock.rotateRight();
  }
}
