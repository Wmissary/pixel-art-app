import { createLayer } from "./app.js";
import { saveCanvasDataToStorage } from "./storage.js";

function addLayerHTMLToContainer(container, data) {
  const lockedIcon = data.locked ? "fa-lock" : "fa-lock-open";
  const hiddenIcon = data.hidden ? "fa-eye-slash" : "fa-eye";

  const layerHTML = `<li class="layers-list" >
                                <input type="checkbox" class="layers-checkbox" name="selected"/>
                                <span class="layers-name">${data.name}</span>
                                <div>
                                <i class="fa-solid ${hiddenIcon} layer-icon layer-hide"></i>
                                <i class="fa-solid ${lockedIcon} layer-icon layer-lock"></i>
                                <i class="fa-solid fa-trash-alt layer-icon layer-delete"></i>
                                </div>
                            </li>`;
  container.insertAdjacentHTML("beforeend", layerHTML);
  return container.lastElementChild;
}

function addLayerEventListener({ button, container, canvas }) {
  button.addEventListener("click", () => {
    const layerName = prompt("Enter layer name");
    const layer = createLayer(layerName);
    const layerElement = addLayerHTMLToContainer(container, layer);
    canvas.addLayer(layer);

    const layerCheckbox = layerElement.querySelector(".layers-checkbox");
    selectLayerEventListener({ layerCheckbox, layer, canvas });
    toggleHiddenEventListener({
      button: layerElement.querySelector(".layer-hide"),
      layer,
      canvas,
    });
    toggleLockEventListener({
      button: layerElement.querySelector(".layer-lock"),
      layer,
    });
    deleteLayerEventListener({
      button: layerElement.querySelector(".layer-delete"),
      layer,
      canvas,
    });
  });
}

function selectLayerEventListener({ layerCheckbox, layer, canvas }) {
  layerCheckbox.addEventListener("change", () => {
    if (layerCheckbox.checked) {
      canvas.layer = layer;
    } else canvas.layer = null;

    const allLayerCheckbox = document.querySelectorAll(".layers-checkbox");

    const otherCheckboxes = [...allLayerCheckbox].filter(
      (c) => c !== layerCheckbox
    );

    for (const checkbox of otherCheckboxes) checkbox.checked = false;
  });
}

function toggleHiddenEventListener({ button, layer, canvas }) {
  button.addEventListener("click", () => {
    layer.hidden = !layer.hidden;
    if (layer.hidden) {
      button.classList.remove("fa-eye");
      button.classList.add("fa-eye-slash");
    } else {
      button.classList.add("fa-eye");
      button.classList.remove("fa-eye-slash");
    }
    canvas.draw();
  });
}

function toggleLockEventListener({ button, layer }) {
  button.addEventListener("click", () => {
    layer.locked = !layer.locked;
    if (layer.locked) {
      button.classList.remove("fa-lock-open");
      button.classList.add("fa-lock");
    } else {
      button.classList.add("fa-lock-open");
      button.classList.remove("fa-lock");
    }
  });
}

function deleteLayerEventListener({ button, layer, canvas }) {
  button.addEventListener("click", () => {
    canvas.removeLayer(layer);
    button.parentElement.parentElement.remove();
    canvas.draw();
    saveCanvasDataToStorage("local", canvas);
  });
}

export {
  addLayerHTMLToContainer,
  addLayerEventListener,
  selectLayerEventListener,
  toggleHiddenEventListener,
  toggleLockEventListener,
  deleteLayerEventListener,
};
