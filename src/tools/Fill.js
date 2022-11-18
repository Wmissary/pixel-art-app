import Tool from "../classes/Tool.js";
import Tile from "../classes/Tile.js";

export default class Fill extends Tool {
  constructor(name) {
    super(name);
  }
  do({ event, canvas, color }) {
    if (canvas.layer !== null) {
      const gridObject = canvas.getGridPosition(event);
      const initialX = gridObject.x;
      const initialY = gridObject.y;
      const fill = (x, y) => {
        const foundedTile = canvas.layer.tiles.some((t) => {
          return t.x === x && t.y === y;
        });
        if (!foundedTile) {
          const tileInstance = new Tile({ x, y, color });
          canvas.layer.tiles.push(tileInstance);
          fill(x + 1, y);
          fill(x - 1, y);
          fill(x, y + 1);
          fill(x, y - 1);
        }
      };
      fill(initialX, initialY);
    }
  }
}
