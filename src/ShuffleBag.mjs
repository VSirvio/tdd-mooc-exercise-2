export class ShuffleBag {
  values;
  currentIndex = 0;

  constructor(values) {
    this.values = values;
  }

  next() {
    const currentIndex = this.currentIndex;
    this.currentIndex = (this.currentIndex + 1) % this.values.length;
    return this.values[currentIndex];
  }
}
