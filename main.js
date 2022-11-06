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

const drawButton = document.getElementById("draw");
const eraseButton = document.getElementById("erase");

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

  const color = document.getElementById("color").value;

  const tile = new Tile({ x, y, color });

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
    const color = document.getElementById("color").value;

    const x = Math.floor(
      e.offsetX / (parseInt(getComputedStyle(canvas).width) / 16)
    );

    const y = Math.floor(
      e.offsetY / (parseInt(getComputedStyle(canvas).width) / 16)
    );

    const tile = new Tile({ x, y, color });

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
