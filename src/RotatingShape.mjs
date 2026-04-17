export class RotatingShape {
  characters;

  static fromString() {
    return new RotatingShape();
  }

  constructor() {
    this.characters = "ABC\nDEF\nGHI\n";
  }

  toString() {
    return this.characters;
  }
}
