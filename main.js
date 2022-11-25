import { loadCanvasDataFromStorage } from "./src/storage.js";
import { initApp } from "./src/app.js";
import {
  addLayerHTMLToContainer,
  addLayerEventListener,
  selectLayerEventListener,
  toggleHiddenEventListener,
  toggleLockEventListener,
  deleteLayerEventListener,
} from "./src/layer.js";
import {
  addColorHTMLToContainer,
  addColorEventListener,
  selectColorEventListener,
  deleteColorEventListener,
} from "./src/color.js";
import { selectToolEventListener } from "./src/tool.js";

import { Pencil, Eraser, Fill, ColorPick } from "./src/tools/index.js";
import { clickOnCanvasEventListener } from "./src/canvas.js";
import { exportToPngEventListener } from "./src/export.js";

document.addEventListener("DOMContentLoaded", () => {
  // Init Tools
  const tools = [
    new Pencil("pencil"),
    new Eraser("eraser"),
    new Fill("fill"),
    new ColorPick("colorPick", document.querySelector("#color")),
  ];
  // Get data from storage

  const { layers, colors, size } = loadCanvasDataFromStorage();

  // Ask for pixel art s
  function askDimension() {
    const widthAnswer = prompt("Enter the width of the pixel art");
    const heightAnswer = prompt("Enter the height of the pixel art");
    if (widthAnswer === null || heightAnswer === null) {
      alert("Invalid dimension");
      return askDimension();
    }
    if (isNaN(widthAnswer) || isNaN(heightAnswer)) {
      alert("Invalid dimension");
      return askDimension();
    }
    if (widthAnswer < 1 || heightAnswer < 1) {
      alert("Invalid dimension");
      return askDimension();
    }
    return { width: widthAnswer, height: heightAnswer };
  }

  const { width, height } = size ?? askDimension();

  // Init app
  const canvas = initApp({
    layers,
    tools,
    colors,
    width,
    height,
    canvasElement: document.getElementById("canvas"),
  });

  // Create html layers from canvas layers set
  const layersContainer = document.getElementById("layers-ul");
  for (const layer of canvas.layers) {
    addLayerHTMLToContainer(layersContainer, layer);
    // Add event listeners to layers
    selectLayerEventListener({
      layerCheckbox:
        layersContainer.lastElementChild.querySelector(".layers-checkbox"),
      layer: layer,
      canvas: canvas,
    });
    toggleHiddenEventListener({
      button: layersContainer.lastElementChild.querySelector(".layer-hide"),
      layer: layer,
      canvas: canvas,
    });
    toggleLockEventListener({
      button: layersContainer.lastElementChild.querySelector(".layer-lock"),
      layer: layer,
    });
    deleteLayerEventListener({
      button: layersContainer.lastElementChild.querySelector(".layer-delete"),
      layer: layer,
      canvas: canvas,
    });
  }
  // Create html colors from colors set
  const colorInput = document.getElementById("color");
  const colorsContainer = document.getElementById("color-selected-container");
  for (const color of canvas.colors) {
    const colorElement = addColorHTMLToContainer(colorsContainer, color);
    // Add event listener to color
    selectColorEventListener({
      colorDiv: colorElement,
      colorInput: colorInput,
    });
    deleteColorEventListener({
      colorDiv: colorElement,
      canvas: canvas,
    });
  }

  // add EventListeners to Add Layer Button
  const addLayerBtn = document.getElementById("layers-add");
  addLayerEventListener({
    button: addLayerBtn,
    container: layersContainer,
    canvas: canvas,
  });

  // add EventListeners to Add Color Button
  const addColorBtn = document.getElementById("color-selected-add");
  addColorEventListener({
    button: addColorBtn,
    container: colorsContainer,
    colorInput: colorInput,
    canvas: canvas,
  });

  // add EventListeners to Tools
  const toolsList = document.querySelectorAll(".tools-list");
  for (const tool of toolsList) {
    selectToolEventListener({
      toolElement: tool,
      toolsList: toolsList,
      canvas: canvas,
    });
  }

  // add EventListeners to Canvas
  clickOnCanvasEventListener(canvas, colorInput, colors);

  // add EventListeners to Export Buttons
  exportToPngEventListener(canvas);

  // add EventListeners to Canvas container

  const canvasContainer = document.getElementById("canvas-container");

  // move canvas on mouse drag
  let isDragging = false;
  let lastX = 0;
  let lastY = 0;
  canvasContainer.addEventListener("mousedown", (e) => {
    if (e.buttons !== 2) return;
    isDragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
  });

  // disable mouse context menu on container
  canvasContainer.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });

  canvasContainer.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const style = getComputedStyle(canvas.element);
    const matrix = new DOMMatrix(style.transform);
    const x = e.clientX - lastX;
    const y = e.clientY - lastY;
    canvas.element.style.transform = `translate(${matrix.e + x}px, ${
      matrix.f + y
    }px) scale(${matrix.a})`;
    lastX = e.clientX;
    lastY = e.clientY;
  });
  canvasContainer.addEventListener("mouseup", () => {
    isDragging = false;
  });

  // zoom canvas on mouse wheel
  canvasContainer.addEventListener("wheel", (e) => {
    const style = getComputedStyle(canvas.element);
    const matrix = new DOMMatrix(style.transform);
    const zoom = e.deltaY > 0 ? 0.9 : 1.1;
    canvas.element.style.transform = `translate(${matrix.e}px, ${
      matrix.f
    }px) scale(${Math.round((matrix.a * zoom + Number.EPSILON) * 10) / 10})`;
  });
});
