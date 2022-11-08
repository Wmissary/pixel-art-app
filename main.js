import Colors from "./src/Colors.js";
import Canvas from "./src/Canvas.js";
import { rgbToHex } from "./src/utils.js";
import { kCanvasAvailableTools } from "./src/config.js";

// Color Management
const favoriteColorsContainer = document.getElementById(
  "color-selected-container"
);
const colorPaletteInput = document.getElementById("color");
const addColorToFavorites = document.getElementById("color-selected-add");

const colors = new Colors({
  current: colorPaletteInput.value,
});

colorPaletteInput.onchange = (event) => {
  colors.current = event.target.value;
};

addColorToFavorites.onclick = () => {
  colors.add(colors.current);
  const color = document.createElement("div");
  color.classList.add("color-favorite");
  color.style.backgroundColor = colors.current;
  favoriteColorsContainer.prepend(color);

  color.onclick = () => {
    colors.current = rgbToHex(color.style.backgroundColor);
    colorPaletteInput.value = colors.current;
  };

  color.oncontextmenu = (e) => {
    e.preventDefault();
    colors.remove(colors.current);
    color.remove();
  };
};

// Tools Management
const canvas = new Canvas(document.getElementById("canvas"));
const toolsList = document.querySelectorAll(".tools-list");

for (const tool of toolsList) {
  tool.onclick = () => {
    if (canvas.currentTool === kCanvasAvailableTools[tool.id]) {
      canvas.currentTool = kCanvasAvailableTools.none;
      tool.classList.remove("tool-list-selected");
    } else {
      canvas.currentTool = kCanvasAvailableTools[tool.id];
      tool.classList.add("tool-list-selected");
      for (const otherTool of toolsList) {
        if (otherTool !== tool) {
          otherTool.classList.remove("tool-list-selected");
        }
      }
    }
  };
}

// Click Event Management
canvas.element.onmousedown = (event) => {
  canvas.clickEvent(event, colors);
  canvas.click = true;
  if (event.buttons === 4) {
    canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
};

canvas.element.onmousemove = (event) => {
  if (canvas.click) {
    canvas.clickEvent(event, colors);
  }
};

document.onmouseup = () => {
  canvas.click = false;
};
