import Colors from "./src/Colors.js";
import Canvas from "./src/Canvas.js";
import Tile from "./src/Tile.js";
import Tool from "./src/Tool.js";

import { kCanvasAvailableTools } from "./src/config.js";

import { rgbToHex, getCoordinates } from "./src/utils.js";

// Color Management
const favoriteColorsContainer = document.getElementById(
  "color-selected-container"
);
const colorPaletteInput = document.getElementById("color");
const addColorToFavorites = document.getElementById("color-selected-add");

const colors = new Colors({
  currentColor: colorPaletteInput.value,
});

colorPaletteInput.onchange = (event) => {
  colors.currentColor = event.target.value;
};

addColorToFavorites.onclick = () => {
  colors.add(colors.currentColor);
  const color = document.createElement("div");
  color.classList.add("color-favorite");
  color.style.backgroundColor = colors.currentColor;
  favoriteColorsContainer.prepend(color);

  color.onclick = () => {
    colors.currentColor = rgbToHex(color.style.backgroundColor);
    colorPaletteInput.value = colors.currentColor;
  };

  color.oncontextmenu = (e) => {
    e.preventDefault();
    colors.remove(colors.currentColor);
    color.remove();
  };
};
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
  canvas.click = true;
  const { x, y } = getCoordinates({
    offsetX: event.offsetX,
    offsetY: event.offsetY,
    width: canvas.width,
    height: canvas.height,
    computedWidth: canvas.computedWidth,
    computedHeight: canvas.computedHeight,
  });
  const tile = new Tile({ x, y, color: colors.currentColor });
  canvas.onClick(tile);
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
    const tile = new Tile({ x, y, color: colors.currentColor });
    canvas.onClick(tile);
  }
});

canvas.element.addEventListener("mouseup", () => {
  canvas.click = false;
});
