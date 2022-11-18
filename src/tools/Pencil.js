import Tool from "../classes/Tool.js";
import Tile from "../classes/Tile.js";

export default class Pencil extends Tool {
  constructor(name) {
    super(name);
  }
  do({ event, canvas, color }) {
    const { x, y } = canvas.getGridPosition(event);
    if (canvas.layer !== null) {
      const foundedTile = canvas.layer.tiles.some((t) => {
        return t.x === x && t.y === y;
      });
      if (!foundedTile) {
        const tileInstance = new Tile({ x, y, color });
        canvas.layer.tiles.push(tileInstance);
      } else {
        const tile = canvas.layer.tiles.find((t) => {
          return t.x === x && t.y === y;
        });
        tile.color = color;
      }
    }
  }
}
