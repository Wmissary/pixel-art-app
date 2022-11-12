import Canvas from "./src/Canvas.js";
import Tile from "./src/Tile.js";
import Tool from "./src/Tool.js";
import Layer from "./src/Layer.js";

import { kCanvasAvailableTools } from "./src/config.js";

import { rgbToHex, getCoordinates } from "./src/utils.js";

const canvas = new Canvas(document.getElementById("canvas"));

// Colors Event Listeners
const favoriteColorsContainer = document.getElementById(
  "color-selected-container"
);
const colorPaletteInput = document.getElementById("color");
const addColorToFavoritesButton = document.getElementById("color-selected-add");

addColorToFavoritesButton.addEventListener("click", () => {
  const color = colorPaletteInput.value;
  const colorElement = document.createElement("div");
  colorElement.classList.add("color-favorite");
  colorElement.style.backgroundColor = color;
  favoriteColorsContainer.prepend(colorElement);

  colorElement.addEventListener("click", () => {
    colorPaletteInput.value = rgbToHex(colorElement.style.backgroundColor);
  });

  colorElement.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    colorElement.remove();
  });
});

// Tools Event Listener

const toolList = document.querySelectorAll(".tools-list");
const tools = [];
for (const tool of toolList) {
  const toolInstance = new Tool(kCanvasAvailableTools[tool.id], tool);
  tools.push(toolInstance);

  tool.addEventListener("click", () => {
    toolInstance.click();
    canvas.currentTool = toolInstance;
    for (const otherTool of tools) {
      if (otherTool !== toolInstance) {
        otherTool.selected = false;
        otherTool.update();
      }
    }
  });
}

// Canvas Event Listener

canvas.element.addEventListener("mousedown", (event) => {
  if (event.buttons === 1) {
    canvas.click = true;
    const { x, y } = getCoordinates({
      offsetX: event.offsetX,
      offsetY: event.offsetY,
      width: canvas.width,
      height: canvas.height,
      computedWidth: canvas.computedWidth,
      computedHeight: canvas.computedHeight,
    });
    const tile = new Tile({ x, y, color: colorPaletteInput.value });
    canvas.onClick(tile, { name: canvas.currentLayer });
  }

  if (event.buttons === 4) {
    canvas.clear();
  }
});

canvas.element.addEventListener("mousemove", (event) => {
  if (canvas.click) {
    const { x, y } = getCoordinates({
      offsetX: event.offsetX,
      offsetY: event.offsetY,
      width: canvas.width,
      height: canvas.height,
      computedWidth: canvas.computedWidth,
      computedHeight: canvas.computedHeight,
    });
    const tile = new Tile({ x, y, color: colorPaletteInput.value });
    canvas.onClick(tile, { name: canvas.currentLayer });
  }
});

canvas.element.addEventListener("mouseup", () => {
  canvas.click = false;
});

// Layers Event Listener

const layersButton = document.getElementById("layers-add");
const layersContainer = document.getElementById("layers-ul");

const layersList = document.querySelectorAll(".layers-list");

for (const layer of layersList) {
  const layerName = layer.querySelector(".layers-name").innerText;
  const layerInstance = new Layer(layerName, layer);
  canvas.addLayer(layerInstance);
  layer.addEventListener("click", () => {
    canvas.currentLayer = layerInstance.name;
    layerInstance.click();
    for (const otherLayer of canvas.layers) {
      if (otherLayer !== layerInstance) {
        otherLayer.selected = false;
        otherLayer.update();
      }
    }
  });
}

layersButton.addEventListener("click", () => {
  const layersList = document.querySelectorAll(".layers-list");
  const layerNumber = layersList.length + 1;
  const cloneLayer = layersList[0].cloneNode(true);
  cloneLayer.classList.remove("layers-list-selected");
  cloneLayer.classList.add("layers-list");
  const layerSpan = cloneLayer.querySelector(".layers-name");
  layerSpan.textContent = `Layer ${layerNumber}`;
  const layerInstance = new Layer(layerSpan.textContent, cloneLayer);
  canvas.addLayer(layerInstance);
  cloneLayer.addEventListener("click", () => {
    canvas.currentLayer = layerInstance.name;
    layerInstance.click();
    for (const otherLayer of canvas.layers) {
      if (otherLayer !== layerInstance) {
        otherLayer.selected = false;
        otherLayer.update();
      }
    }
  });

  layersContainer.appendChild(cloneLayer);
});
