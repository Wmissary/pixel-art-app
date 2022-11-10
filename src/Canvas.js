import Tile from "./Tile.js";
import { getCoordinates } from "./utils.js";
import { kCanvasAvailableTools } from "./config.js";

export default class Canvas {
  constructor(canvas) {
    if (canvas === undefined) throw new Error("Canvas is undefined");
    if (!(canvas instanceof HTMLCanvasElement))
      throw new Error("Canvas is not an HTMLCanvasElement");

    this.element = canvas;
    this.ctx = canvas.getContext("2d");
    this.width = canvas.width;
    this.height = canvas.height;

    this.currentTool = kCanvasAvailableTools.none;
    this.click = false;
  }
  drawTile(tile) {
    tile.draw(this.ctx);
  }

  eraseTile(tile) {
    tile.erase(this.ctx);
  }

  clickEvent(event, color) {
    if (event.buttons === 1) {
      const { x, y } = getCoordinates(event, this.element, 16);
      const tile = new Tile({ x, y, color });
      if (this.currentTool === kCanvasAvailableTools.draw) {
        this.drawTile(tile);
      }
      if (this.currentTool === kCanvasAvailableTools.erase) {
        this.eraseTile(tile);
      }
    }
  }
}
