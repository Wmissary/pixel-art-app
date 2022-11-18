import { rgbToHex } from "./utils.js";
import { saveCanvasDataToStorage } from "./storage.js";

function addColorHTMLToContainer(container, color) {
  const colorDiv = document.createElement("div");
  colorDiv.classList.add("color-favorite");
  colorDiv.style.backgroundColor = color;
  container.prepend(colorDiv);
  return colorDiv;
}

function addColorEventListener({ button, container, colorInput, canvas }) {
  button.addEventListener("click", () => {
    const color = colorInput.value;
    const colorDiv = addColorHTMLToContainer(container, color);
    canvas.colors.add(color);
    selectColorEventListener({ colorDiv, colorInput });
    deleteColorEventListener({ colorDiv, canvas });
  });
}

function selectColorEventListener({ colorDiv, colorInput }) {
  colorDiv.addEventListener("click", (event) => {
    if (event.buttons === 1)
      colorInput.value = rgbToHex(colorDiv.style.backgroundColor);
  });
}

function deleteColorEventListener({ colorDiv, canvas }) {
  colorDiv.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    colorDiv.remove();
    canvas.colors.delete(rgbToHex(colorDiv.style.backgroundColor));
    saveCanvasDataToStorage("local", canvas);
  });
}

export {
  addColorHTMLToContainer,
  addColorEventListener,
  selectColorEventListener,
  deleteColorEventListener,
};
