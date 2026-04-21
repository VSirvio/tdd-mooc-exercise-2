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
    let result = '';
    for (let y = 0; y < this.characters.length; ++y) {
      for (let x = 0; x < this.characters[y].length; ++x) {
        result += this.characters[y][x];
      }
      result += "\n";
    }
    return result;
  }

  rotateRight() {
    const rotated = this.characters[0].map((_, i) =>
      this.characters.map(row => row[i]).toReversed()
    );

    let result = '';
    for (let y = 0; y < rotated.length; ++y) {
      for (let x = 0; x < rotated[y].length; ++x) {
        result += rotated[y][x];
      }
      result += "\n";
    }
    return result;
  }

  rotateLeft() {
    let result = '';
    for (let x = this.characters[0].length - 1; x >= 0; --x) {
      for (let y = 0; y < this.characters.length; ++y) {
        result += this.characters[y][x];
      }
      result += "\n";
    }
    return result;
  }
}
