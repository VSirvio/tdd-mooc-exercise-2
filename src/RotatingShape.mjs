export class RotatingShape {
  characters;

  static fromString() {
    const characters = ['ABC', 'DEF', 'GHI'].map(row => Array.from(row));
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
    let result = '';
    for (let x = 0; x < this.characters[0].length; ++x) {
      for (let y = this.characters.length - 1; y >= 0; --y) {
        result += this.characters[y][x];
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
