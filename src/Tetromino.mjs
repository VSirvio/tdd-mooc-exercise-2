import {
  duplicateOf,
  multiple2DArraysFromString,
  stringFrom2DArray,
} from "./utils.mjs";


export class Tetromino {
  static T_SHAPE = Tetromino.fromString(
    `.... .T.. .... .T..
     TTT. TT.. .T.. .TT.
     .T.. .T.. TTT. .T..
     .... .... .... ....`,
  );

  static I_SHAPE = Tetromino.fromString(
    `.... ..I.
     IIII ..I.
     .... ..I.
     .... ..I.`,
  );

  static O_SHAPE = Tetromino.fromString(
    `....
     .OO.
     .OO.
     ....`,
  );

  static L_SHAPE = Tetromino.fromString(
    `.... LL..
     LLL. .L..
     L... .L..
     .... ....`,
  );

  static fromString(initString) {
    return new Tetromino(multiple2DArraysFromString(initString));
  }

  #characterMatrices;

  constructor(characterMatrices) {
    this.#characterMatrices = duplicateOf(characterMatrices);
  }

  toString() {
    return stringFrom2DArray(this.#characterMatrices[0]);
  }

  to2DArray() {
    return duplicateOf(this.#characterMatrices[0]);
  }

  rotateRight() {
    return new Tetromino([
      ...this.#characterMatrices.slice(1),
      this.#characterMatrices[0],
    ]);
  }

  rotateLeft() {
    return new Tetromino([
      this.#characterMatrices.at(-1),
      ...this.#characterMatrices.slice(0, -1),
    ]);
  }
}
