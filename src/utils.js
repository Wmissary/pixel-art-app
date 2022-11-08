export function rgbToHex(rgb) {
  return `#${rgb
    .match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
    .slice(1)
    .map((n) => parseInt(n, 10).toString(16).padStart(2, "0"))
    .join("")}`;
}

export function getCoordinates(event, element, tileSize) {
  const width = parseInt(getComputedStyle(element).width);
  const height = parseInt(getComputedStyle(element).height);

  const x = Math.floor(event.offsetX / (width / tileSize));
  const y = Math.floor(event.offsetY / (height / tileSize));
  return { x, y };
}
