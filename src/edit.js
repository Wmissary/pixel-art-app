function zoomCanvasEventListener(element, canvas) {
  element.addEventListener("wheel", (e) => {
    const style = getComputedStyle(canvas.element);
    const matrix = new DOMMatrix(style.transform);
    const zoom = e.deltaY > 0 ? 0.9 : 1.1;
    canvas.element.style.transform = `translate(${matrix.e}px, ${
      matrix.f
    }px) scale(${Math.round((matrix.a * zoom + Number.EPSILON) * 10) / 10})`;
  });
}

function moveCanvasEventListener(element, canvas) {
  let isDragging = false;
  let lastX = 0;
  let lastY = 0;

  element.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });

  element.addEventListener("mousedown", (e) => {
    if (e.buttons !== 2) return;
    isDragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
  });

  element.addEventListener("mousemove", (e) => {
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
  element.addEventListener("mouseup", () => {
    isDragging = false;
  });
}

export { zoomCanvasEventListener, moveCanvasEventListener };
