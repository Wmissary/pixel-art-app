import Layer from "./classes/Layer.js";
import Tile from "./classes/Tile.js";
import Canvas from "./classes/Canvas.js";

function initApp({ layers, tools, canvasElement, colors }) {
  if (tools === undefined) throw new Error("Tools are undefined");
  const kSetLayers = new Set();
  const kSetColors = new Set(colors);
  const kSetTools = new Set(tools);

  if (layers.length !== 0) {
    // Create layers from storage data and add them to the layers set
    for (const layerData of layers) {
      const layer = initLayer(layerData);
      kSetLayers.add(layer);
    }
  } else kSetLayers.add(new Layer({ name: "Layer 1" }));

  const canvas = initCanvas({
    element: canvasElement,
    layers: kSetLayers,
    tools: kSetTools,
    colors: kSetColors,
  });
  canvas.draw();

  return canvas;
}

function initCanvas(data) {
  const canvas = new Canvas({
    element: data.element,
    layers: data.layers,
    tools: data.tools,
    colors: data.colors,
  });
  return canvas;
}

function initLayer(data) {
  return new Layer({
    name: data.name,
    tiles: data.tiles.map((t) => initTile(t)),
    hidden: data.hidden,
    locked: data.locked,
  });
}

function createLayer(name) {
  return new Layer({ name: name });
}

function initTile(data) {
  const tile = new Tile({
    x: data.x,
    y: data.y,
    color: data.color,
  });
  return tile;
}

export { initApp, initCanvas, createLayer };
