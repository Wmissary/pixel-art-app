import Canvas from "./src/Canvas.js";
import Tile from "./src/Tile.js";
import Tool from "./src/Tool.js";

import { kCanvasAvailableTools } from "./src/config.js";

import { rgbToHex, getCoordinates } from "./src/utils.js";

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

const canvas = new Canvas(document.getElementById("canvas"));

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
    canvas.onClick(tile);
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
    canvas.onClick(tile);
  }
});

canvas.element.addEventListener("mouseup", () => {
  canvas.click = false;
});
