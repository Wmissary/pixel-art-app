export default class LayerHTML {
  constructor(layerContainer, layer) {
    this.layer = layer;
    this.layerContainer = layerContainer;
    this.element = `<li class="layers-list" >
                        <input type="checkbox" class="layers-checkbox" name="selected"/>
                        <span class="layers-name">${layer.name}</span>
                        <div>
                            <i class="fa-solid fa-eye layer-icon layer-hide"></i>
                            <i class="fa-solid fa-lock-open layer-icon layer-lock"></i>
                            <i class="fa-solid fa-trash-alt layer-icon layer-delete"></i>
                        </div>
                    </li>`;
  }
  create() {
    this.layerContainer.insertAdjacentHTML("beforeend", this.element);
    const layerElements = this.layerContainer.querySelectorAll(".layers-list");
    return [...layerElements].find(
      (e) => e.querySelector(".layers-name").innerText === this.layer.name
    );
  }
}
