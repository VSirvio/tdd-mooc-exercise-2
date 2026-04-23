export class Coord2D {
  #x;
  #y;

  constructor(x, y) {
    this.#x = x;
    this.#y = y;
  }

  getX() {
    return this.#x;
  }

  getY() {
    return this.#y;
  }

  movedBy(dx, dy) {
    return new Coord2D(this.#x + dx, this.#y + dy);
  }
}
