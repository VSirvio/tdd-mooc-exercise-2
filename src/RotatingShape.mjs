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
    const rotated = this.characters[0].map((_, i) =>
      this.characters.map(row => row[i]).toReversed()
    );

    return stringFrom2DArray(rotated);
  }

  rotateLeft() {
    const rotated = this.characters[0].map((_, i) =>
      this.characters.map(row => row[i])
    ).toReversed();

    let result = '';
    for (let y = 0; y < rotated.length; ++y) {
      for (let x = 0; x < rotated[y].length; ++x) {
        result += rotated[y][x];
      }
      result += "\n";
    }
    return result;
  }
}
