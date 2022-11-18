export default class Layer {
  #name;
  #tiles;
  #selected;
  #hidden;
  #locked;
  constructor({
    name,
    tiles = [],
    selected = false,
    hidden = false,
    locked = false,
  } = {}) {
    if (name === undefined) throw new Error("Layer name is undefined");
    if (typeof name !== "string") throw new Error("Layer name is not a string");

    this.#name = name;
    this.#tiles = tiles;

    this.#selected = selected;
    this.#hidden = hidden;
    this.#locked = locked;
  }

  get name() {
    return this.#name;
  }

  get tiles() {
    return this.#tiles;
  }

  set tiles(tiles) {
    if (tiles === undefined) throw new Error("Tiles are undefined");
    if (!Array.isArray(tiles)) throw new Error("Tiles are not an array");
    this.#tiles = tiles;
  }

  get selected() {
    return this.#selected;
  }

  set selected(isSelected) {
    this.#selected = isSelected;
  }

  get hidden() {
    return this.#hidden;
  }

  set hidden(isHidden) {
    this.#hidden = isHidden;
  }

  get locked() {
    return this.#locked;
  }

  set locked(isLocked) {
    this.#locked = isLocked;
  }
}
