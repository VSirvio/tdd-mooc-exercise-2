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
  #screenContentChanged = true;
  onClearLine = () => {};

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

  cellAt(row, column) {
    return this.#getScreenContent().at(row).at(column);
  }

  toString() {
    return stringFrom2DArray(this.#getScreenContent());
  }

  #getScreenContent() {
    if (this.#currentBlockLocation === undefined) {
      return withoutBorders(this.#gameArea);
    }

    const screenContent = composeOver(
      this.#currentBlock.to2DArray(),
      this.#gameArea,
      this.#currentBlockLocation,
    );

    return withoutBorders(screenContent);
  }

  drop(block) {
    if (this.#currentBlockLocation) {
      throw Error('already falling');
    }

    this.#screenContentChanged = true;

    let blockObject = block;
    if (typeof block === 'string') {
      blockObject = new SingleBlock(block);
    }

    const blockWidth = blockObject.toString().indexOf("\n");

    this.#currentBlock = blockObject;
    this.#currentBlockLocation = new Coord2D(
      Math.floor((this.getWidth() - blockWidth) / 2),
      blockWidth === 4 ? -1 : 0,
    );
  }

  tick() {
    if (this.#currentBlockLocation) {
      this.#screenContentChanged = true;

      const newLocation = this.#currentBlockLocation.movedBy(0, 1);

      if (this.#overlaps(this.#currentBlock, newLocation)) {
        this.#gameArea = composeOver(
          this.#currentBlock.to2DArray(),
          this.#gameArea,
          this.#currentBlockLocation,
        );

        this.#currentBlockLocation = undefined;

        let numOfClearedLines = 0;
        for (let i = 0; i < this.getHeight() - 1; ++i) {
          if (this.#gameArea[i].every(ch => ch !== '.')) {
            this.#gameArea.splice(i, 1);
            this.#gameArea.unshift(['#', ...Array(this.getWidth() - 2).fill('.'), '#']);
            ++numOfClearedLines;
          }
        }
        if (numOfClearedLines > 0) {
          this.onClearLine(numOfClearedLines);
        }
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

  #move(dx, dy) {
    this.#screenContentChanged = true;

    const newLocation = this.#currentBlockLocation.movedBy(dx, dy);
    if (!this.#overlaps(this.#currentBlock, newLocation)) {
      this.#currentBlockLocation = newLocation;
    }
  }

  moveLeft() {
    this.#move(-1, 0);
  }

  moveRight() {
    this.#move(1, 0);
  }

  moveDown() {
    this.#move(0, 1);
  }

  #rotate(direction) {
    this.#screenContentChanged = true;

    const rotatedBlock = direction === 'right' ?
      this.#currentBlock.rotateRight() :
      this.#currentBlock.rotateLeft();

    if (!this.#overlaps(rotatedBlock, this.#currentBlockLocation)) {
      this.#currentBlock = rotatedBlock;
    } else {
      const newLocationsToTry = [
        this.#currentBlockLocation.movedBy(1, 0),
        this.#currentBlockLocation.movedBy(-1, 0),
      ];
      for (const newLocation of newLocationsToTry) {
        if (!this.#overlaps(rotatedBlock, newLocation)) {
          this.#currentBlock = rotatedBlock;
          this.#currentBlockLocation = newLocation;
          break;
        }
      }
    }
  }

  rotateRight() {
    this.#rotate('right');
  }

  rotateLeft() {
    this.#rotate('left');
  }
}
