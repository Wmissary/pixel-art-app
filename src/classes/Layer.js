import Canvas from "./Canvas.js";

export default class Layer {
  #name;
  #tiles;
  #canvas;
  #selected;
  #visible;
  #locked;
  constructor(name, canvas) {
    if (name === undefined) throw new Error("Layer name is undefined");
    if (typeof name !== "string") throw new Error("Layer name is not a string");

    if (canvas === undefined) throw new Error("Layer canvas is undefined");
    if (!(canvas instanceof Canvas))
      throw new Error("Layer canvas is not a Canvas instance");

    this.#name = name;
    this.#tiles = [];

    this.#canvas = canvas;

    this.#selected = false;
    this.#visible = true;
    this.#locked = false;
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

  set selected(value) {
    if (typeof value !== "boolean") throw new Error("Value is not a boolean");
    this.#selected = value;
  }

  get visible() {
    return this.#visible;
  }

  set visible(value) {
    if (typeof value !== "boolean") throw new Error("Value is not a boolean");
    this.#visible = value;
  }

  get locked() {
    return this.#locked;
  }

  set locked(value) {
    if (typeof value !== "boolean") throw new Error("Value is not a boolean");
    this.#locked = value;
  }

  toggleSelected() {
    if (!this.#locked) {
      this.#selected = !this.#selected;
      this.#selected
        ? (this.#canvas.layer = this)
        : (this.#canvas.layer = null);
    }
  }

  toggleVisibility() {
    this.#visible = !this.#visible;
  }

  toggleLock() {
    this.#locked = !this.#locked;
  }
}
