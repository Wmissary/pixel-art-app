function clickOnCanvasEventListener(canvas, colorInput) {
  canvas.element.addEventListener("mousedown", (e) => {
    if (e.buttons === 1) {
      canvas.click = true;
      canvas.useTool({
        event: e,
        color: colorInput.value,
      });
    } else if (e.buttons === 4) {
      canvas.clear();
    }

    canvas.draw();
  });
  canvas.element.addEventListener("mousemove", (e) => {
    if (canvas.click) {
      canvas.useTool({
        event: e,
        color: colorInput.value,
      });
      canvas.draw();
    }
  });
  document.addEventListener("mouseup", () => {
    canvas.click = false;
  });
}

export { clickOnCanvasEventListener };
