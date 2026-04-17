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
    return this.characters[2][0] + this.characters[1][0] + this.characters[0][0] + "\n" +
      this.characters[2][1] + this.characters[1][1] + this.characters[0][1] + "\n" +
      this.characters[2][2] + this.characters[1][2] + this.characters[0][2] + "\n";
  }
}
