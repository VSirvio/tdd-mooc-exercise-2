export class Tetromino {
  static T_SHAPE = new Tetromino([
    '.T.',
    'TTT',
    '...',
  ]);

  characters;

  constructor (initCharacters) {
    this.characters = [...initCharacters];
  }

  toString() {
    return this.characters.join("\n") + "\n";
  }

  rotateRight() {
    return new Tetromino(['.T.', '.TT', '.T.'])
  }

  rotateLeft() {
    return new Tetromino(['.T.', 'TT.', '.T.'])
  }
}
