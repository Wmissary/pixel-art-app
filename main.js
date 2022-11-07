class Tile {
  constructor(data) {
    this.x = data.x;
    this.y = data.y;
    this.color = data.color;
    this.width = 1;
    this.height = 1;
  }
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  erase(ctx) {
    ctx.clearRect(this.x, this.y, this.width, this.height);
  }
}

class Colors {
  #favorite;
  #current;
  constructor({ favorite = new Set([]), current }) {
    this.#favorite = favorite;
    this.#current = current;
  }
  get favorite() {
    return this.#favorite;
  }
  get current() {
    return this.#current;
  }
  set current(color) {
    this.#current = color;
  }

  add(color) {
    this.#favorite.add(color);
  }
  remove(color) {
    this.#favorite.delete(color);
  }
}

// Tools
const drawButton = document.getElementById("draw");
const eraseButton = document.getElementById("erase");

// Color
const favoriteColorsContainer = document.getElementById(
  "color-selected-container"
);
const colorPaletteInput = document.getElementById("color");
const addColorToFavorites = document.getElementById("color-selected-add");

const rgb2hex = (rgb) =>
  `#${rgb
    .match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
    .slice(1)
    .map((n) => parseInt(n, 10).toString(16).padStart(2, "0"))
    .join("")}`;

const colors = new Colors({
  current: colorPaletteInput.value,
});

colorPaletteInput.onchange = (e) => {
  colors.current = e.target.value;
};

addColorToFavorites.onclick = () => {
  colors.add(colors.current);
  const color = document.createElement("div");
  color.classList.add("color-favorite");
  color.style.backgroundColor = colors.current;
  favoriteColorsContainer.prepend(color);
  color.onclick = () => {
    colors.current = rgb2hex(color.style.backgroundColor);
    colorPaletteInput.value = colors.current;
  };
  color.oncontextmenu = (e) => {
    e.preventDefault();
    colors.remove(colors.current);
    color.remove();
  };
};

let mode = "none";

drawButton.onclick = () => {
  if (mode === "draw") {
    mode = "none";
    drawButton.classList.remove("tool-list-selected");
  } else {
    eraseButton.classList.remove("tool-list-selected");
    drawButton.classList.add("tool-list-selected");
    mode = "draw";
  }
};

eraseButton.onclick = () => {
  if (mode === "erase") {
    eraseButton.classList.remove("tool-list-selected");
    mode = "none";
  } else {
    drawButton.classList.remove("tool-list-selected");
    eraseButton.classList.add("tool-list-selected");
    mode = "erase";
  }
};

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let click = false;

canvas.onmousedown = (e) => {
  const x = Math.floor(
    e.offsetX / (parseInt(getComputedStyle(canvas).width) / 16)
  );
  const y = Math.floor(
    e.offsetY / (parseInt(getComputedStyle(canvas).width) / 16)
  );

  const tile = new Tile({ x, y, color: colors.current });

  if (mode === "draw" && e.buttons !== 4) {
    tile.draw(ctx);
  }

  if (mode === "erase" && e.buttons !== 4) {
    tile.erase(ctx);
  }

  if (e.buttons === 4) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  click = true;
};

canvas.onmousemove = (e) => {
  if (click) {
    const x = Math.floor(
      e.offsetX / (parseInt(getComputedStyle(canvas).width) / 16)
    );

    const y = Math.floor(
      e.offsetY / (parseInt(getComputedStyle(canvas).width) / 16)
    );

    const tile = new Tile({ x, y, color: colors.current });

    if (mode === "draw" && e.buttons !== 4) {
      tile.draw(ctx);
    }

    if (mode === "erase" && e.buttons !== 4) {
      tile.erase(ctx);
    }
  }
};

document.onmouseup = () => {
  click = false;
};
