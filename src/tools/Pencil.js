import Tool from "../classes/Tool.js";

export default class Pencil extends Tool {
  constructor(buttonElement, selectedCSSClassName, canvas) {
    super(buttonElement, selectedCSSClassName, canvas);
  }
  use(tile) {
    const foundTile = this.canvas.layer.tiles.find(
      (t) => t.x === tile.x && t.y === tile.y
    );
    if (
      foundTile &&
      foundTile.color !== tile.color &&
      !this.canvas.layer.locked
    ) {
      foundTile.color = tile.color;
    }
    if (!foundTile && !this.canvas.layer.locked) {
      this.canvas.layer.tiles.push(tile);
    }
  }
}
