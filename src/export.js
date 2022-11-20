function exportCanvasToPng(canvas) {
  const dataUrl = canvas.element.toDataURL("image/png");
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = "canvas.png";
  a.click();
}

function exportToPngEventListener(canvas) {
  const exportPngBtn = document.getElementById("export-png");
  exportPngBtn.addEventListener("click", () => {
    exportCanvasToPng(canvas);
  });
}

export { exportToPngEventListener };
