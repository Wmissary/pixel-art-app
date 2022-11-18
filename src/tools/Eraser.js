import Tool from "../classes/Tool.js";

export default class Eraser extends Tool {
  constructor(name) {
    super(name);
  }
  do({ event, canvas }) {
    if (!canvas.layer.locked) {
      const { x, y } = canvas.getGridPosition(event);
      canvas.layer.tiles = canvas.layer.tiles.filter(
        (t) => t.x !== x || t.y !== y
      );
    }
  }
}
