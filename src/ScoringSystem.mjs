export class ScoringSystem {
  score = 0;
  level = 1;

  linesCleared() {
    this.score += 40;
  }
}
