export default class Colors {
  #favorite;
  #currentColor;
  constructor({ favorite = new Set([]), currentColor }) {
    if (currentColor === undefined)
      throw new Error("Current color is undefined");
    if (!(favorite instanceof Set))
      throw new Error("Favorite colors is not a Set");
    if (typeof currentColor !== "string")
      throw new Error("Current color is not a string");

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
    if (typeof color !== "string") throw new Error("Color is not a string");
    if (color === undefined) throw new Error("Color is undefined");
    this.#currentColor = color;
  }

  add(color) {
    this.#favorite.add(color);
  }
  remove(color) {
    this.#favorite.delete(color);
  }
}
