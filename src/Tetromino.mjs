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
    const rotatingShapes = [RotatingShape.fromString(initString)];
    for (let i = 0; i < 3; ++i) {
      rotatingShapes.push(RotatingShape.fromString(rotatingShapes.at(-1).rotateRight()));
    }
    return new Tetromino(rotatingShapes);
  }

  rotatingShapes;

  constructor(rotatingShapes) {
    this.rotatingShapes = [...rotatingShapes];
  }

  toString() {
    return this.rotatingShapes[0].toString();
  }

  rotateRight() {
    return new Tetromino([...this.rotatingShapes.slice(1), this.rotatingShapes[0]]);
  }

  rotateLeft() {
    return new Tetromino([this.rotatingShapes.at(-1), ...this.rotatingShapes.slice(0, -1)]);
  }
}
