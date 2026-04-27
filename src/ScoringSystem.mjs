export class ScoringSystem {
  score = 0;
  level = 1;

  linesCleared(numOfLines) {
    if (numOfLines === 2) {
      this.score += 100;
    } else if (numOfLines === 3) {
      this.score += 300;
    } else if (numOfLines === 4) {
      this.score += 1200;
    } else {
      this.score += 40;
    }
  }
}
