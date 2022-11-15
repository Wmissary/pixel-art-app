import Tool from "../classes/Tool.js";

export default class Eraser extends Tool {
  constructor(buttonElement, selectedCSSClassName, canvas) {
    super(buttonElement, selectedCSSClassName, canvas);
  }
  use(tile) {
    if (!this.canvas.layer.locked) {
      this.canvas.layer.tiles = this.canvas.layer.tiles.filter(
        (t) => t.x !== tile.x || t.y !== tile.y
      );
    }
  }
}
