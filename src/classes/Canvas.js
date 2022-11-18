export default class Canvas {
  #element;
  #ctx;
  #width;
  #height;
  #containerWidth;
  #containerHeight;
  #tools;
  #tool;
  #layers;
  #layer;
  #colors;
  #click;
  constructor(data) {
    if (data.element === undefined)
      throw new Error("Canvas Element is missing");
    if (!(data.element instanceof HTMLCanvasElement))
      throw new Error("Canvas Element is not valid");

    if (data.tools === undefined) throw new Error("Tools are missing");
    if (!(data.tools instanceof Set)) throw new Error("Tools are not valid");

    this.#element = data.element;

    this.#ctx = this.element.getContext("2d");

    this.#width = this.element.width;
    this.#height = this.element.height;

    const computedStyle = getComputedStyle(this.element);

    const computedWidth = parseInt(computedStyle.width);
    const computedHeight = parseInt(computedStyle.height);

    this.#containerWidth = computedWidth;
    this.#containerHeight = computedHeight;

    this.#tools = data.tools;
    this.#tool = null;

    this.#layers = data.layers;
    this.#layer = null;

    this.#colors = data.colors;

    this.#click = false;
  }
  get element() {
    return this.#element;
  }
  get tools() {
    return this.#tools;
  }
  get tool() {
    return this.#tool;
  }
  set tool(tool) {
    if (tool !== null) {
      this.#tool = tool;
      this.#tool.selected = true;
      const otherTools = [...this.#tools].filter((tool) => tool !== this.#tool);
      for (const otherTool of otherTools) {
        otherTool.selected = false;
      }
    } else {
      this.#tool.selected = false;
      this.#tool = null;
    }
  }
  get layers() {
    return this.#layers;
  }

  get layer() {
    return this.#layer;
  }

  set layer(layer) {
    if (layer !== null) {
      this.#layer = layer;
      this.#layer.selected = true;
      const otherLayers = [...this.#layers].filter(
        (layer) => layer !== this.#layer
      );
      for (const otherLayer of otherLayers) {
        otherLayer.selected = false;
      }
    } else {
      this.#layer.selected = false;
      this.#layer = null;
    }
  }

  get colors() {
    return this.#colors;
  }

  get click() {
    return this.#click;
  }

  set click(click) {
    this.#click = click;
  }

  addLayer(layer) {
    this.#layers.add(layer);
  }
  removeLayer(layer) {
    this.#layers.delete(layer);
    if (this.#layer === layer) this.#layer = null;
  }
  getGridPosition(event) {
    const x = Math.max(
      0,
      Math.min(
        Math.floor((event.offsetX / this.#containerWidth) * this.#width),
        this.#width - 1
      )
    );
    const y = Math.max(
      0,
      Math.min(
        Math.floor((event.offsetY / this.#containerHeight) * this.#height),
        this.#height - 1
      )
    );
    return { x, y };
  }
  useTool({ event, color }) {
    if (this.#tool !== null && this.#layer !== null) {
      if (!this.#layer.locked) {
        this.#tool.do({ event, canvas: this, color });
      }
    }
  }
  draw() {
    this.#ctx.clearRect(0, 0, this.#width, this.#height);
    for (const layer of this.#layers) {
      if (!layer.hidden && layer.tiles.length !== 0) {
        for (const tile of layer.tiles) {
          tile.draw(this.#ctx);
        }
      }
    }
  }
  clear() {
    for (const layer of this.#layers) {
      if (layer.locked === false) {
        layer.tiles = [];
      }
    }
  }
}
