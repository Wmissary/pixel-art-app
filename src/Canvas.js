import { kCanvasAvailableTools } from "./config.js";

export default class Canvas {
  constructor(canvas) {
    if (canvas === undefined) throw new Error("Canvas is undefined");
    if (!(canvas instanceof HTMLCanvasElement))
      throw new Error("Canvas is not an HTMLCanvasElement");

    this.element = canvas;
    this.ctx = this.element.getContext("2d");

    this.width = this.element.width;
    this.height = this.element.height;

    this.computedWidth = parseInt(getComputedStyle(this.element).width);
    this.computedHeight = parseInt(getComputedStyle(this.element).height);

    this.currentTool = undefined;

    this.tiles = [];

    this.click = false;
  }

  onClick(tile) {
    if (
      this.currentTool &&
      this.currentTool.name === kCanvasAvailableTools.draw
    ) {
      if (!this.tiles.find((t) => t.x === tile.x && t.y === tile.y)) {
        this.tiles.push(tile);
      }
    } else if (
      this.currentTool &&
      this.currentTool.name === kCanvasAvailableTools.erase
    ) {
      if (this.tiles.find((t) => t.x === tile.x && t.y === tile.y)) {
        this.tiles = this.tiles.filter((t) => t.x !== tile.x || t.y !== tile.y);
      }
    }
    this.update();
  }

  update() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    for (const tile of this.tiles) {
      tile.draw(this.ctx);
    }
  }
}
