import { RotatingShape } from "./RotatingShape.mjs";

import {
  duplicateOf,
  multiple2DArraysFromString,
  stringFrom2DArray,
} from "./utils.mjs";


export class Tetromino {
  static T_SHAPE = Tetromino.fromString(
    `.T. .T. ... .T.
     TTT .TT TTT TT.
     ... .T. .T. .T.`,
  );

  static I_SHAPE = Tetromino.fromString(
    `..... ..I..
     ..... ..I..
     IIII. ..I..
     ..... ..I..
     ..... .....`,
  );

  static O_SHAPE = Tetromino.fromString(
    `.OO
     .OO
     ...`,
  );

  static fromString(initString, orientationCount) {
    if (orientationCount) {
      const rotatingShapes = [RotatingShape.fromString(initString)];
      for (let i = 0; i < orientationCount - 1; ++i) {
        rotatingShapes.push(RotatingShape.fromString(rotatingShapes.at(-1).rotateRight()));
      }
      return new Tetromino(rotatingShapes);
    } else {
      return new Tetromino(multiple2DArraysFromString(initString));
    }
  }

  #rotatingShapes;
  #characterMatrices;

  constructor(rotatingShapes) {
    this.#rotatingShapes = [...rotatingShapes];
  }

  toString() {
    return this.#rotatingShapes[0] instanceof RotatingShape ?
      this.#rotatingShapes[0].toString() :
      stringFrom2DArray(this.#rotatingShapes[0]);
  }

  to2DArray() {
    return this.#rotatingShapes[0] instanceof RotatingShape ?
      this.#rotatingShapes[0].toString().trim().split("\n") :
      duplicateOf(this.#rotatingShapes[0]);
  }

  rotateRight() {
    return new Tetromino([...this.#rotatingShapes.slice(1), this.#rotatingShapes[0]]);
  }

  rotateLeft() {
    return new Tetromino([this.#rotatingShapes.at(-1), ...this.#rotatingShapes.slice(0, -1)]);
  }
}
