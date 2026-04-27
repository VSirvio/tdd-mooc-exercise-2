export class ScoringSystem {
  score = 0;
  level = 1;
  linesClearedCount = 0;

  linesCleared(numOfLines) {
    if (numOfLines === 2) {
      this.score += 100 * this.level;
    } else if (numOfLines === 3) {
      this.score += 300 * this.level;
    } else if (numOfLines === 4) {
      this.score += 1200;
    } else {
      this.score += 40 * this.level;
    }

    this.linesClearedCount += numOfLines;
    this.level = Math.floor(this.linesClearedCount / 10) + 1;
  }
}
