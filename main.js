import Canvas from "./src/classes/Canvas.js";
import Layer from "./src/classes/Layer.js";
import Tile from "./src/classes/Tile.js";

import { Pencil, Eraser } from "./src/tools/index.js";
import { rgbToHex } from "./src/utils.js";

import LayerEvents from "./src/LayerEvents.js";

import LayerHTML from "./src/LayerHTML.js";

const canvasElement = document.getElementById("canvas");
const canvas = new Canvas(canvasElement);

// tool Events
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

// Layer Events

const layerContainer = document.getElementById("layers-ul");
const layers = new Set([new Layer("Layer 1", canvas)]);

for (const layerClass of layers) {
  const layerHTML = new LayerHTML(layerContainer, layerClass);
  const layerElement = layerHTML.create();
  const layerEvent = new LayerEvents(layerClass, layerElement);
  layerEvent.add(canvas, layers, layerContainer);
}

const addLayerButton = document.getElementById("layers-add");

addLayerButton.addEventListener("click", () => {
  const layer = new Layer(`Layer ${layers.size + 1}`, canvas);
  layers.add(layer);

  const layerHTML = new LayerHTML(layerContainer, layer);
  const layerElement = layerHTML.create();

  const layerEvent = new LayerEvents(layer, layerElement);
  layerEvent.add(canvas, layers, layerContainer);
});

// Canvas Events

canvas.element.addEventListener("mousedown", (e) => {
  if (canvas.layer && e.buttons === 1) {
    canvas.isClicked = true;
    const { x, y } = canvas.getGridPosition(e);
    const tile = new Tile({ x, y, canvas, color: colorPaletteInput.value });
    canvas.click(tile);
    canvas.draw(layers);
  }
  if (e.buttons === 4) {
    canvas.clear(layers);
  }
});

canvas.element.addEventListener("mousemove", (e) => {
  if (canvas.isClicked === true && canvas.layer) {
    const { x, y } = canvas.getGridPosition(e);
    const tile = new Tile({ x, y, color: colorPaletteInput.value });
    canvas.click(tile);
    canvas.draw(layers);
  }
});

document.addEventListener("mouseup", () => {
  canvas.isClicked = false;
  canvas.draw(layers);
});

// Color Events
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
