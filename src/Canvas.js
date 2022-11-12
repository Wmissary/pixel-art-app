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
  #layers;
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
    this.#layers = [
      {
        name: "Layer 1",
        tiles: [],
      },
    ];

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

  addLayer(layer) {
    if (layer === undefined) throw new Error("Layer is undefined");
    if (layer) this.#layers.push(layer);
  }

  set click(value) {
    if (value === undefined) throw new Error("Click is undefined");
    if (typeof value !== "boolean") throw new Error("Click is not a boolean");
    this.#click = value;
  }

  onClick(tile, layer) {
    const foundLayer = this.#layers.find((l) => l.name === layer.name);
    const foundTile = foundLayer.tiles.find(
      (t) => t.x === tile.x && t.y === tile.y
    );
    if (
      this.#currentTool &&
      this.#currentTool.name === kCanvasAvailableTools.draw
    ) {
      if (foundLayer) {
        if (foundTile && foundTile.color !== tile.color) {
          foundTile.color = tile.color;
        }
        if (!foundTile) {
          foundLayer.tiles.push(tile);
        }
      }
    } else if (
      this.#currentTool &&
      this.#currentTool.name === kCanvasAvailableTools.erase
    ) {
      if (foundLayer) {
        if (foundTile) {
          foundLayer.tiles = foundLayer.tiles.filter(
            (t) => t.x !== tile.x || t.y !== tile.y
          );
        }
      }
    }
    this.#update();
    console.log(this.#layers);
  }
  clear() {
    this.#tiles = [];
    this.#update();
  }

  #update() {
    this.#ctx.clearRect(0, 0, this.#width, this.#height);
    for (const layer of this.#layers) {
      for (const tile of layer.tiles) {
        tile.draw(this.#ctx);
      }
    }
  }
}
