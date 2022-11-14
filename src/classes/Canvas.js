export default class Canvas {
  constructor(canvasElement) {
    if (canvasElement === undefined)
      throw new Error("Canvas Element is missing");
    if (!(canvasElement instanceof HTMLCanvasElement))
      throw new Error("Canvas Element is not valid");

    this.element = canvasElement;
    this.ctx = this.element.getContext("2d");

    this.width = this.element.width;
    this.height = this.element.height;

    const computedStyle = getComputedStyle(this.element);

    const computedWidth = parseInt(computedStyle.width);
    const computedHeight = parseInt(computedStyle.height);

    this.containerWidth = computedWidth;
    this.containerHeight = computedHeight;

    this.tool = null;

    this.layer = null;

    this.isClicked = false;
  }
  getGridPosition(e) {
    const x = Math.max(
      0,
      Math.min(
        Math.floor((e.offsetX / this.containerWidth) * this.width),
        this.width - 1
      )
    );
    const y = Math.max(
      0,
      Math.min(
        Math.floor((e.offsetY / this.containerHeight) * this.height),
        this.height - 1
      )
    );
    return { x, y };
  }
  click(tile) {
    if (this.tool && this.layer) this.tool.use(tile);
  }

  draw(layers) {
    this.ctx.clearRect(0, 0, this.width, this.height);
    for (const layer of layers) {
      for (const tile of layer.tiles) {
        tile.draw(this.ctx);
      }
    }
  }
  clear(layers) {
    for (const layer of layers) {
      layer.tiles = [];
      this.draw(layers);
    }
  }
}
