export class Board {
  width;
  height;
  gameArea;

  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.gameArea = [];
    for (let y = 0; y < height; ++y) {
      this.gameArea.push([]);
      for (let x = 0; x < width; ++x) {
        this.gameArea[y].push('.');
      }
    }
  }

  toString() {
    let result = '';
    for (const row of this.gameArea) {
      result += row.join('') + "\n";
    }
    return result;
  }
}
