import { stringFrom2DArray } from "./utils.mjs";

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
    const transposed = this.characters[0].map((_, i) =>
      this.characters.map(row => row[i])
    );
    const result = transposed.map(row => row.toReversed());

    return stringFrom2DArray(result);
  }

  rotateLeft() {
    const transposed = this.characters[0].map((_, i) =>
      this.characters.map(row => row[i])
    );
    const result = transposed.toReversed();

    return stringFrom2DArray(result);
  }
}
