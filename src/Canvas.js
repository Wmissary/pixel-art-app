import { kCanvasAvailableTools } from "./config.js";

export default class Canvas {
  #element;
  #ctx;
  #width;
  #height;
  #computedWidth;
  #computedHeight;
  #currentTool;
  #tiles;
  #click;
  constructor(canvas) {
    if (canvas === undefined) throw new Error("Canvas is undefined");
    if (!(canvas instanceof HTMLCanvasElement))
      throw new Error("Canvas is not an HTMLCanvasElement");

    this.#element = canvas;
    this.#ctx = this.#element.getContext("2d");

    this.#width = this.#element.width;
    this.#height = this.#element.height;

    this.#computedWidth = parseInt(getComputedStyle(this.#element).width);
    this.#computedHeight = parseInt(getComputedStyle(this.#element).height);

    this.#currentTool = undefined;

    this.#tiles = [];

    this.#click = false;
  }

  get element() {
    return this.#element;
  }

  get ctx() {
    return this.#ctx;
  }

  get width() {
    return this.#width;
  }

  get height() {
    return this.#height;
  }

  get computedWidth() {
    return this.#computedWidth;
  }

  get computedHeight() {
    return this.#computedHeight;
  }

  get currentTool() {
    return this.#currentTool;
  }

  set currentTool(value) {
    this.#currentTool = value;
  }

  get click() {
    return this.#click;
  }

  set click(value) {
    if (value === undefined) throw new Error("Click is undefined");
    if (typeof value !== "boolean") throw new Error("Click is not a boolean");
    this.#click = value;
  }

  onClick(tile) {
    if (
      this.#currentTool &&
      this.#currentTool.name === kCanvasAvailableTools.draw
    ) {
      const foundTile = this.#tiles.find(
        (t) => t.x === tile.x && t.y === tile.y
      );
      if (foundTile && foundTile.color !== tile.color) {
        foundTile.color = tile.color;
      }
      if (!foundTile) {
        this.#tiles.push(tile);
      }
    } else if (
      this.#currentTool &&
      this.#currentTool.name === kCanvasAvailableTools.erase
    ) {
      if (this.#tiles.find((t) => t.x === tile.x && t.y === tile.y)) {
        this.#tiles = this.#tiles.filter(
          (t) => t.x !== tile.x || t.y !== tile.y
        );
      }
    }
    this.#update();
  }
  clear() {
    this.#tiles = [];
    this.#update();
  }

  #update() {
    this.#ctx.clearRect(0, 0, this.#width, this.#height);
    for (const tile of this.#tiles) {
      tile.draw(this.ctx);
    }
  }
}
