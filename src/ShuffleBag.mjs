export class ShuffleBag {
  values;
  currentIndex = 0;

  constructor(values) {
    this.values = values;
  }

  next() {
    return this.values[this.currentIndex++];
  }
}
