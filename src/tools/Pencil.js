import Tool from "../classes/Tool.js";
import Tile from "../classes/Tile.js";

export default class Pencil extends Tool {
  constructor(name) {
    super(name);
  }
  do({ event, canvas, color }) {
    const { x, y } = canvas.getGridPosition(event);
    const tileInstance = new Tile({ x, y, color });
    if (canvas.layer !== null) {
      const foundedTile = canvas.layer.tiles.some((t) => {
        return t.x === tileInstance.x && t.y === tileInstance.y;
      });
      if (!foundedTile) canvas.layer.tiles.push(tileInstance);
      else {
        const tile = canvas.layer.tiles.find((t) => {
          return t.x === tileInstance.x && t.y === tileInstance.y;
        });
        tile.color = color;
      }
    }
  }
}
