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
    return new Tetromino([RotatingShape.fromString(initString)]);
  }

  rotatingShapes;

  constructor(rotatingShapes) {
    this.rotatingShapes = [...rotatingShapes];
  }

  toString() {
    return this.rotatingShapes[0].toString();
  }

  rotateRight() {
    return Tetromino.fromString(this.rotatingShapes[0].rotateRight());
  }

  rotateLeft() {
    return Tetromino.fromString(this.rotatingShapes[0].rotateLeft());
  }
}
