export default class Tool {
  #name;
  #element;
  #selected;
  constructor(name, element) {
    if (name === undefined) throw new Error("Tool name is undefined");
    if (element === undefined) throw new Error("Tool element is undefined");
    if (typeof name !== "symbol") throw new Error("Tool name is not a Symbol");
    if (!(element instanceof HTMLElement))
      throw new Error("Tool element is not an HTMLElement");

    this.#name = name;
    this.#element = element;
    this.#selected = false;
  }
  get name() {
    return this.#name;
  }
  get element() {
    return this.#element;
  }
  get selected() {
    return this.#selected;
  }
  set selected(value) {
    if (typeof value !== "boolean")
      throw new Error("Tool selected value is not a boolean");
    this.#selected = value;
  }
  click() {
    this.#selected = !this.#selected;
    this.update();
  }
  update() {
    if (this.#selected) {
      this.#element.classList.add("tool-list-selected");
    } else {
      this.#element.classList.remove("tool-list-selected");
    }
  }
}
