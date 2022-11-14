import Canvas from "./src/classes/Canvas.js";
import { Pencil, Eraser } from "./src/tools/index.js";
import { rgbToHex } from "./src/utils.js";
import Layer from "./src/classes/Layer.js";
import Tile from "./src/classes/Tile.js";

const canvasElement = document.getElementById("canvas");
const canvas = new Canvas(canvasElement);

// tools Events
const pencilButton = document.getElementById("pencil");
const pencil = new Pencil("pencil", canvas);

const eraserButton = document.getElementById("eraser");
const eraser = new Eraser("eraser", canvas);

const tools = new Set([pencil, eraser]);
const toolsElements = new Set([pencilButton, eraserButton]);

for (const toolElement of toolsElements) {
  toolElement.addEventListener("click", () => {
    const tool = [...tools].find((t) => t.name === toolElement.id);
    tool.toggleSelected();
    toolElement.classList.toggle("tool-list-selected");
    const otherTools = [...tools].filter((t) => t !== tool);
    for (const otherTool of otherTools) {
      otherTool.selected = false;
      const otherToolElement = [...toolsElements].find(
        (t) => t.id === otherTool.name
      );
      otherToolElement.classList.remove("tool-list-selected");
    }
  });
}

// layers Events
const layerContainer = document.getElementById("layers-ul");

const defaultLayer = new Layer("Layer 1", canvas);

const layers = new Set([defaultLayer]);

const layerElement = (layer) => {
  return `<li class="layers-list" >
  <div>
  <span class="layers-name">${layer.name}</span>
  </div>
  <div>
  <i class="fa-solid fa-eye layer-icon layer-hide"></i>
  <i class="fa-solid fa-lock layer-icon layer-lock"></i>
  </div>
  </li>`;
};

const addLayerButtonListener = () => {
  const layerSelectButtons = document.querySelectorAll(".layers-name");

  for (const layerSelectButton of layerSelectButtons) {
    layerSelectButton.addEventListener("click", () => {
      const layer = [...layers].find(
        (l) => l.name === layerSelectButton.innerText
      );
      layer.toggleSelected();
      layerSelectButton.parentElement.parentElement.classList.toggle(
        "layers-list-selected"
      );
      const otherLayers = [...layers].filter((l) => l !== layer);
      for (const otherLayer of otherLayers) {
        otherLayer.selected = false;
        const otherLayerElement = [...layerSelectButtons].find(
          (l) => l.innerText === otherLayer.name
        );
        otherLayerElement.parentElement.parentElement.classList.remove(
          "layers-list-selected"
        );
      }
    });
  }
};

for (const layer of layers) {
  layerContainer.innerHTML += layerElement(layer);
  addLayerButtonListener();
}

const addLayerButton = document.getElementById("layers-add");

addLayerButton.addEventListener("click", () => {
  const layer = new Layer(`Layer ${layers.size + 1}`, canvas);
  layers.add(layer);
  layerContainer.innerHTML += layerElement(layer);
  addLayerButtonListener();
});

// Canvas Events

canvas.element.addEventListener("mousedown", (e) => {
  if (canvas.layer && e.buttons === 1) {
    canvas.isClicked = true;
    const { x, y } = canvas.getGridPosition(e);
    const tile = new Tile({ x, y, canvas, color: colorPaletteInput.value });
    canvas.click(tile);
  }
  if (e.buttons === 4) {
    canvas.clear(layers);
  }
  canvas.draw(layers);
});

canvas.element.addEventListener("mousemove", (e) => {
  if (canvas.isClicked === true && canvas.layer) {
    const { x, y } = canvas.getGridPosition(e);
    const tile = new Tile({ x, y, color: colorPaletteInput.value });
    canvas.click(tile);
  }
  canvas.draw(layers);
});

document.addEventListener("mouseup", () => {
  canvas.isClicked = false;
});

// Colors Event
const favoriteColorsContainer = document.getElementById(
  "color-selected-container"
);
const colorPaletteInput = document.getElementById("color");
const addColorToFavoritesButton = document.getElementById("color-selected-add");

addColorToFavoritesButton.addEventListener("click", () => {
  const colorElement = document.createElement("div");
  colorElement.classList.add("color-favorite");
  colorElement.style.backgroundColor = colorPaletteInput.value;
  favoriteColorsContainer.prepend(colorElement);

  colorElement.addEventListener("click", () => {
    colorPaletteInput.value = rgbToHex(colorElement.style.backgroundColor);
  });

  colorElement.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    colorElement.remove();
  });
});
