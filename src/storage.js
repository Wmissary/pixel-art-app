function loadCanvasDataFromStorage() {
  const data =
    sessionStorage.getItem("canvas") ?? localStorage.getItem("canvas");
  if (data !== null) return JSON.parse(data);
  return null;
}

function saveCanvasDataToStorage(storage, canvas) {
  console.log(canvas.colors);
  const data = {
    layers: [...canvas.layers].map((layer) => {
      return {
        name: layer.name,
        tiles: [...layer.tiles].map((tile) => {
          return {
            x: tile.x,
            y: tile.y,
            color: tile.color,
          };
        }),
        hidden: layer.hidden,
        locked: layer.locked,
      };
    }),
    colors: [...canvas.colors],
  };

  const dataString = JSON.stringify(data);
  if (storage === "local") localStorage.setItem("canvas", dataString);
  else if (storage === "session") sessionStorage.setItem("canvas", dataString);
  else throw new Error("Invalid storage type");
}

export { loadCanvasDataFromStorage, saveCanvasDataToStorage };
