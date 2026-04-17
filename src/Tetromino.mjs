import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
  static T_SHAPE = new Tetromino(
    `.T.
     TTT
     ...`
  );

  static I_SHAPE = new Tetromino(
    `.....
     .....
     IIII.
     .....
     .....`
  );

  rotatingShape;

  constructor(initString) {
    this.rotatingShape = RotatingShape.fromString(initString);
  }

  toString() {
    return this.rotatingShape.toString();
  }

  rotateRight() {
    return new Tetromino(this.rotatingShape.rotateRight());
  }

  rotateLeft() {
    return new Tetromino(this.rotatingShape.rotateLeft());
  }
}
