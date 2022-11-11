export default class Tile {
  #x;
  #y;
  #color;
  #width;
  #height;
  constructor(data) {
    if (data === undefined) throw new Error("Tile data is undefined");
    if (typeof data !== "object") throw new Error("Tile data is not an object");
    if (data.x === undefined) throw new Error("Tile x is undefined");
    if (data.y === undefined) throw new Error("Tile y is undefined");
    if (data.color === undefined) throw new Error("Tile color is undefined");
    if (typeof data.x !== "number") throw new Error("Tile x is not a number");
    if (typeof data.y !== "number") throw new Error("Tile y is not a number");
    if (typeof data.color !== "string")
      throw new Error("Tile color is not a string");

    this.#x = data.x;
    this.#y = data.y;
    this.#color = data.color;
    this.#width = 1;
    this.#height = 1;
  }
  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }

  get color() {
    return this.#color;
  }

  draw(ctx) {
    ctx.fillStyle = this.#color;
    ctx.fillRect(this.#x, this.#y, this.#width, this.#height);
  }
}
