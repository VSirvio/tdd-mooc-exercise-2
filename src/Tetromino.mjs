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

  static fromString(initString) {
    return new Tetromino(multiple2DArraysFromString(initString));
  }

  #rotatingShapes;
  #characterMatrices;

  constructor(rotatingShapes) {
    this.#rotatingShapes = [...rotatingShapes];
    this.#characterMatrices = [...rotatingShapes];
  }

  toString() {
    return stringFrom2DArray(this.#characterMatrices[0]);
  }

  to2DArray() {
    return duplicateOf(this.#characterMatrices[0]);
  }

  rotateRight() {
    return new Tetromino([...this.#characterMatrices.slice(1), this.#characterMatrices[0]]);
  }

  rotateLeft() {
    return new Tetromino([this.#characterMatrices.at(-1), ...this.#rotatingShapes.slice(0, -1)]);
  }
}
