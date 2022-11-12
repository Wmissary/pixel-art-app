export default class Layer {
  #name;
  #tiles;
  #element;
  #selected;
  #visible;
  constructor(name, element) {
    if (name === undefined) throw new Error("Name is undefined");
    if (typeof name !== "string") throw new Error("Name is not a string");
    this.#name = name;
    this.#tiles = [];
    this.#element = element;
    this.#selected = false;
    this.#visible = true;
  }
  get name() {
    return this.#name;
  }
  get tiles() {
    return this.#tiles;
  }
  set tiles(tiles) {
    if (tiles === undefined) throw new Error("Tiles is undefined");
    if (!Array.isArray(tiles)) throw new Error("Tiles is not an array");
    this.#tiles = tiles;
  }
  get element() {
    return this.#element;
  }
  get selected() {
    return this.#selected;
  }
  set selected(value) {
    if (value === undefined) throw new Error("Selected is undefined");
    if (typeof value !== "boolean")
      throw new Error("Selected is not a boolean");
    this.#selected = value;
  }
  get visible() {
    return this.#visible;
  }
  set visible(value) {
    if (value === undefined) throw new Error("Visible is undefined");
    if (typeof value !== "boolean") throw new Error("Visible is not a boolean");
    this.#visible = value;
  }
  addTile(tile) {
    if (tile === undefined) throw new Error("Tile is undefined");
    this.#tiles.push(tile);
  }
  removeTile(tile) {
    if (tile === undefined) throw new Error("Tile is undefined");
    this.#tiles = this.#tiles.filter((t) => t.x !== tile.x || t.y !== tile.y);
  }

  click() {
    this.#selected = !this.#selected;
    this.update();
  }
  update() {
    if (this.#selected) {
      this.#element.classList.add("layers-list-selected");
    } else {
      this.#element.classList.remove("layers-list-selected");
    }
  }
}
