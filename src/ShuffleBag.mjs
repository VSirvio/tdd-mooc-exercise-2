import { duplicateOf } from "./utils.mjs";

export class ShuffleBag {
  values;
  currentIndex = 0;
  getRandomNumber = Math.random;

  constructor(values) {
    this.values = duplicateOf(values);
  }

  next() {
    if (this.currentIndex === 0) {
      for (let i = this.values.length - 1; i > 0; --i) {
        let j = Math.floor(this.getRandomNumber() * (i + 1));
        [this.values[i], this.values[j]] = [this.values[j], this.values[i]];
      }
    }

    const currentIndex = this.currentIndex;
    this.currentIndex = (this.currentIndex + 1) % this.values.length;

    return this.values[currentIndex];
  }
}
