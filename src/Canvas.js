import { kCanvasAvailableTools } from "./config.js";

export default class Canvas {
  #element;
  #ctx;
  #width;
  #height;
  #computedWidth;
  #computedHeight;
  #currentTool;
  #currentLayer;
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

    this.#currentLayer = undefined;

    this.#layers = [];

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

  get layers() {
    return this.#layers;
  }

  get currentLayer() {
    return this.#currentLayer;
  }

  set currentLayer(value) {
    this.#currentLayer = value;
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
    if (
      this.#currentLayer &&
      this.#currentTool &&
      this.#currentTool.name === kCanvasAvailableTools.draw
    ) {
      const foundLayer = this.#layers.find((l) => l.name === layer.name);
      if (foundLayer) {
        const foundTile = foundLayer.tiles.find(
          (t) => t.x === tile.x && t.y === tile.y
        );
        if (foundTile && foundTile.color !== tile.color) {
          foundTile.color = tile.color;
        }
        if (!foundTile) {
          foundLayer.addTile(tile);
        }
      }
    } else if (
      this.#currentLayer &&
      this.#currentTool &&
      this.#currentTool.name === kCanvasAvailableTools.erase
    ) {
      const foundLayer = this.#layers.find((l) => l.name === layer.name);
      if (foundLayer) {
        const foundTile = foundLayer.tiles.find(
          (t) => t.x === tile.x && t.y === tile.y
        );
        if (foundTile) {
          foundLayer.removeTile(tile);
        }
      }
    }
    this.#update();
  }
  clear() {
    for (const layer of this.#layers) {
      layer.tiles = [];
    }
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
