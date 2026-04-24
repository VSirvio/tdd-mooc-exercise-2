import { RotatingShape } from "./RotatingShape.mjs";
import { stringFrom2DArray } from "./utils.mjs";

export class Tetromino {
  static T_SHAPE = Tetromino.fromString(
    `.T.
     TTT
     ...`,
     4
  );

  static I_SHAPE = Tetromino.fromString(
    `.....
     .....
     IIII.
     .....
     .....`,
     2
  );

  static O_SHAPE = Tetromino.fromString(
    `.OO
     .OO
     ...`,
     1
  );

  static fromString(initString, orientationCount) {
    const rotatingShapes = [RotatingShape.fromString(initString)];
    for (let i = 0; i < orientationCount - 1; ++i) {
      rotatingShapes.push(RotatingShape.fromString(rotatingShapes.at(-1).rotateRight()));
    }
    return new Tetromino(rotatingShapes);
  }

  #rotatingShapes;
  #characterMatrices;

  constructor(rotatingShapes) {
    this.#rotatingShapes = [...rotatingShapes];
  }

  toString() {
    return this.#rotatingShapes[0].toString();
  }

  to2DArray() {
    return this.#rotatingShapes[0].toString().trim().split("\n")
  }

  rotateRight() {
    return new Tetromino([...this.#rotatingShapes.slice(1), this.#rotatingShapes[0]]);
  }

  rotateLeft() {
    return new Tetromino([this.#rotatingShapes.at(-1), ...this.#rotatingShapes.slice(0, -1)]);
  }
}
