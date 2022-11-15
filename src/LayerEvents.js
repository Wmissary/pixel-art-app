export default class LayerEvents {
  constructor(layer, layerElement) {
    this.layer = layer;
    this.layerElement = layerElement;
  }
  toggleSelectLayerClick() {
    this.layer.toggleSelected();
    this.layerElement.classList.toggle("layers-list-selected");
  }
  toggleLayerVisibleClick() {
    this.layer.toggleVisibility();
    const layerVisibilityButton =
      this.layerElement.querySelector(".layer-hide");
    layerVisibilityButton.classList.toggle("fa-eye");
    layerVisibilityButton.classList.toggle("fa-eye-slash");
  }
  add(canvas, layers, layerContainer) {
    const selectButton = this.layerElement.querySelector(".layers-name");
    const visibilityButton = this.layerElement.querySelector(".layer-hide");

    selectButton.addEventListener("click", () => {
      this.toggleSelectLayerClick();
      const otherLayers = [...layers].filter((l) => l !== this.layer);
      for (const otherLayer of otherLayers) {
        otherLayer.selected = false;
        const layerElement = layerContainer.querySelectorAll(".layers-list");
        const otherLayerElement = [...layerElement].find(
          (e) => e.querySelector(".layers-name").innerText === otherLayer.name
        );

        otherLayerElement.classList.remove("layers-list-selected");
      }
    });

    visibilityButton.addEventListener("click", () => {
      this.toggleLayerVisibleClick();
      canvas.draw(layers);
    });
  }
}
