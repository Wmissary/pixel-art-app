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
  toggleLockLayerClick() {
    this.layer.toggleLock();
    const layerLockButton = this.layerElement.querySelector(".layer-lock");
    layerLockButton.classList.toggle("fa-lock-open");
    layerLockButton.classList.toggle("fa-lock");
  }

  deleteLayerClick(layers, layerContainer) {
    layers.delete(this.layer);
    layerContainer.removeChild(this.layerElement);
  }

  add(canvas, layers, layerContainer) {
    const selectButton = this.layerElement.querySelector(".layers-checkbox");
    const visibilityButton = this.layerElement.querySelector(".layer-hide");
    const lockButton = this.layerElement.querySelector(".layer-lock");
    const deleteButton = this.layerElement.querySelector(".layer-delete");

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
        otherLayerElement.querySelector(".layers-checkbox").checked = false;
      }
    });

    visibilityButton.addEventListener("click", () => {
      this.toggleLayerVisibleClick();
      canvas.draw(layers);
    });

    lockButton.addEventListener("click", () => {
      this.toggleLockLayerClick();
    });

    deleteButton.addEventListener("click", () => {
      this.deleteLayerClick(layers, layerContainer);
      canvas.draw(layers);
    });
  }
}
