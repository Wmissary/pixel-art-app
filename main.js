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

const favoriteColorsContainer = document.getElementById(
  "color-selected-container"
);
const favoriteColors = new Set();
const colorPaletteInput = document.getElementById("color");
const addColorToFavoritesButton = document.getElementById("color-selected-add");
const layerContainer = document.getElementById("layers-ul");
const data = JSON.parse(localStorage.getItem("data"));
const layers = new Set();

if (data !== null) {
  data.layers.map((l) => {
    const tilesMap = l.tiles.map(
      (t) => new Tile({ x: t.x, y: t.y, color: t.color })
    );
    const layer = new Layer(l.name, canvas);
    layer.visible = l.visible;
    layer.locked = l.locked;
    layer.tiles = tilesMap;
    layers.add(layer);
  });
  data.colors.map((c) => {
    const colorElement = document.createElement("div");
    colorElement.classList.add("color-favorite");
    colorElement.style.backgroundColor = c;
    favoriteColorsContainer.prepend(colorElement);

    favoriteColors.add(c);

    colorElement.addEventListener("click", () => {
      colorPaletteInput.value = rgbToHex(colorElement.style.backgroundColor);
    });

    colorElement.addEventListener("contextmenu", (e) => {
      e.preventDefault();

      favoriteColors.delete(c);
      colorElement.remove();
    });
  });
  canvas.draw(layers);
} else {
  layers.add(new Layer("Layer 1", canvas));
}

for (const layerClass of layers) {
  const layerHTML = new LayerHTML(layerContainer, layerClass);
  const layerElement = layerHTML.create();
  const layerEvent = new LayerEvents(layerClass, layerElement);
  layerEvent.add(canvas, layers, layerContainer);
}

const addLayerButton = document.getElementById("layers-add");

addLayerButton.addEventListener("click", () => {
  const layerName = prompt("Layer Name");
  if (layerName !== null && layerName.length >= 1) {
    const layer = new Layer(`${layerName}`, canvas);
    layers.add(layer);

    const layerHTML = new LayerHTML(layerContainer, layer);
    const layerElement = layerHTML.create();

    const layerEvent = new LayerEvents(layer, layerElement);
    layerEvent.add(canvas, layers, layerContainer);
  }
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

window.addEventListener("mouseup", () => {
  canvas.isClicked = false;
  const data = {
    layers: [...layers].map((layer) => layer.getData()),
    colors: [...favoriteColors],
  };
  localStorage.setItem("data", JSON.stringify(data));
});

// Color Events

addColorToFavoritesButton.addEventListener("click", () => {
  if (!favoriteColors.has(colorPaletteInput.value)) {
    const colorElement = document.createElement("div");
    colorElement.classList.add("color-favorite");
    colorElement.style.backgroundColor = colorPaletteInput.value;
    favoriteColorsContainer.prepend(colorElement);

    favoriteColors.add(colorPaletteInput.value);

    colorElement.addEventListener("click", () => {
      colorPaletteInput.value = rgbToHex(colorElement.style.backgroundColor);
    });

    colorElement.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      favoriteColors.delete(rgbToHex(colorElement.style.backgroundColor));
      colorElement.remove();
    });
  }
});

// Save Event

const saveButton = document.getElementById("save");
saveButton.addEventListener("click", () => {
  const data = {
    layers: [...layers].map((layer) => layer.getData()),
    colors: [...favoriteColors],
  };
  localStorage.setItem("data", JSON.stringify(data));
});
