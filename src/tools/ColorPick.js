import Tool from "../classes/Tool.js";

export default class ColorPick extends Tool {
  constructor(name, colorInput) {
    super(name);
    this.colorInput = colorInput;
  }
  do({ event, canvas }) {
    if (canvas.layer !== null) {
      const { x, y } = canvas.getGridPosition(event);
      const foundedTile = canvas.layer.tiles.find((t) => {
        return t.x === x && t.y === y;
      });
      if (foundedTile) {
        this.colorInput.value = foundedTile.color;
      }
    }
  }
}
