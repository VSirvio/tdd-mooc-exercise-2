export class ScoringSystem {
  score = 0;
  level = 1;

  linesCleared(numOfLines) {
    if (numOfLines === 2) {
      this.score += 100
    } else {
      this.score += 40;
    }
  }
}
