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

document.addEventListener("DOMContentLoaded", () => {
  // Init Tools
  const tools = [
    new Pencil("pencil"),
    new Eraser("eraser"),
    new Fill("fill"),
    new ColorPick("colorPick", document.querySelector("#color")),
  ];
  // Get data from storage
  const { layers = [], colors = [] } = loadCanvasDataFromStorage() ?? {
    layers: [],
    colors: [],
  };

  // Init app
  const canvas = initApp({
    layers,
    tools,
    colors,
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
});
