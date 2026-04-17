import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
  static T_SHAPE = new Tetromino(".T.\nTTT\n...");

  rotatingShape;

  constructor (initString) {
    this.rotatingShape = RotatingShape.fromString(initString);
  }

  toString() {
    return this.rotatingShape.toString();
  }

  rotateRight() {
    return new Tetromino(".T.\n.TT\n.T.")
  }

  rotateLeft() {
    return new Tetromino(".T.\nTT.\n.T.")
  }
}
