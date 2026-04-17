export class Tetromino {
  static T_SHAPE = new Tetromino();

  characters;

  constructor () {
    this.characters = ['.T.', 'TTT', '...'];
  }

  toString() {
    return this.characters.join("\n") + "\n";
  }
}
