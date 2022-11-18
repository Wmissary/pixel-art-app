export default class Tool {
  #name;
  #canvas;
  #selected;
  constructor(name) {
    if (name === undefined) throw new Error("Tool name is undefined");
    if (typeof name !== "string") throw new Error("Tool name is not a string");

    this.#name = name;
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
}
