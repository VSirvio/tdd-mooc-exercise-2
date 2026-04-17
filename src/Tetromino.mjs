export class Tetromino {
  static T_SHAPE = new Tetromino(".T.\nTTT\n...");

  characters;

  constructor (initCharacters) {
    this.characters = initCharacters;
  }

  toString() {
    return this.characters + "\n";
  }

  rotateRight() {
    return new Tetromino(".T.\n.TT\n.T.")
  }

  rotateLeft() {
    return new Tetromino(".T.\nTT.\n.T.")
  }
}
