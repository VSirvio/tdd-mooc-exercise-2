export class RotatingShape {
  characters;

  static fromString() {
    return new RotatingShape();
  }

  constructor() {
    this.characters = ['ABC', 'DEF', 'GHI'].map(row => Array.from(row));
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
      result += this.characters[2][x] + this.characters[1][x] + this.characters[0][x] + "\n";
    }
    return result;
  }
}
