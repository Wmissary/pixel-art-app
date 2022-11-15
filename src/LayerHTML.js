export default class LayerHTML {
  constructor(layerContainer, layer) {
    this.layer = layer;
    this.layerContainer = layerContainer;
    this.element = `<li class="layers-list" >
                         <div>
                            <span class="layers-name">${this.layer.name}</span>
                        </div>
                        <div>
                            <i class="fa-solid fa-eye layer-icon layer-hide"></i>
                            <i class="fa-solid fa-lock layer-icon layer-lock"></i>
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
