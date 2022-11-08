export default class Colors {
  #favorite;
  #currentColor;
  constructor({ favorite = new Set([]), currentColor }) {
    this.#favorite = favorite;
    this.#currentColor = currentColor;
  }
  get favorite() {
    return this.#favorite;
  }
  get currentColor() {
    return this.#currentColor;
  }
  set currentColor(color) {
    this.#currentColor = color;
  }

  add(color) {
    this.#favorite.add(color);
  }
  remove(color) {
    this.#favorite.delete(color);
  }
}
