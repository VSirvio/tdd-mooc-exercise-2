import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
  static T_SHAPE = Tetromino.fromString(
    `.T.
     TTT
     ...`
  );

  static I_SHAPE = Tetromino.fromString(
    `.....
     .....
     IIII.
     .....
     .....`
  );

  static fromString(initString) {
    return new Tetromino(RotatingShape.fromString(initString));
  }

  rotatingShape;

  constructor(rotatingShape) {
    this.rotatingShape = rotatingShape;
  }

  toString() {
    return this.rotatingShape.toString();
  }

  rotateRight() {
    return Tetromino.fromString(this.rotatingShape.rotateRight());
  }

  rotateLeft() {
    return Tetromino.fromString(this.rotatingShape.rotateLeft());
  }
}
