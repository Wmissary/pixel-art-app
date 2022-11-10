import Colors from "./src/Colors.js";
import Canvas from "./src/Canvas.js";
import Tool from "./src/Tool.js";
import { rgbToHex } from "./src/utils.js";
import { kCanvasAvailableTools } from "./src/config.js";

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

// Tools Management
const canvas = new Canvas(document.getElementById("canvas"));
const kToolsArray = [];
const toolsList = document.querySelectorAll(".tools-list");

for (const tool of toolsList) {
  const toolInstance = new Tool(kCanvasAvailableTools[tool.id], tool);
  kToolsArray.push(toolInstance);

  tool.onclick = () => {
    toolInstance.click();
    canvas.currentTool = toolInstance.name;
    for (const tool of kToolsArray) {
      if (tool !== toolInstance) {
        tool.selected = false;
        tool.update();
      }
    }
  };
}

// Click Event Management
canvas.element.onmousedown = (event) => {
  canvas.clickEvent(event, colors.currentColor);
  canvas.click = true;
  if (event.buttons === 4) {
    canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
};

canvas.element.onmousemove = (event) => {
  if (canvas.click) {
    canvas.clickEvent(event, colors.currentColor);
  }
};

document.onmouseup = () => {
  canvas.click = false;
};
