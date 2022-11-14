import Canvas from "./Canvas.js";

export default class Tool {
  #name;
  #canvas;
  #selected;
  constructor(name, canvas) {
    if (name === undefined) throw new Error("Tool name is undefined");
    if (typeof name !== "string") throw new Error("Tool name is not a string");

    if (canvas === undefined) throw new Error("Tool canvas is undefined");
    if (!(canvas instanceof Canvas))
      throw new Error("Tool canvas is not a Canvas instance");

    this.#name = name;
    this.#canvas = canvas;
    this.#selected = false;
  }

  get name() {
    return this.#name;
  }

  get canvas() {
    return this.#canvas;
  }

  get selected() {
    return this.#selected;
  }

  set selected(value) {
    if (typeof value !== "boolean") throw new Error("Value is not a boolean");
    this.#selected = value;
  }

  toggleSelected() {
    this.#selected = !this.#selected;
    this.#selected ? (this.#canvas.tool = this) : (this.#canvas.tool = null);
  }
}
