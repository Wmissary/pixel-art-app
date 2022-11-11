export function rgbToHex(rgb) {
  return `#${rgb
    .match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
    .slice(1)
    .map((n) => parseInt(n, 10).toString(16).padStart(2, "0"))
    .join("")}`;
}

export function getCoordinates({
  offsetX,
  offsetY,
  width,
  height,
  computedWidth,
  computedHeight,
}) {
  const x = Math.floor(offsetX / (computedWidth / width));
  const y = Math.floor(offsetY / (computedHeight / height));
  return { x, y };
}
