import { stringFrom2DArray, transpose } from "./utils.mjs";

export class RotatingShape {
  characters;

  static fromString(initString) {
    const characters = initString.replaceAll(' ', '')
      .trim()
      .split("\n")
      .map(row => Array.from(row));
    return new RotatingShape(characters);
  }

  constructor(initCharacters) {
    this.characters = initCharacters.map(row => [...row]);
  }

  toString() {
    return stringFrom2DArray(this.characters);
  }

  rotateRight() {
    const result = transpose(this.characters).map(row => row.toReversed());

    return stringFrom2DArray(result);
  }

  rotateLeft() {
    const result = transpose(this.characters).toReversed();

    return stringFrom2DArray(result);
  }
}
