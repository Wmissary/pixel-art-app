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

  console.log(e.button);

  if (e.buttons === 1) {
    tile.draw(ctx);
  }

  if (e.buttons === 2) {
    tile.erase(ctx);
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

    console.log(e);

    if (e.buttons === 1) {
      tile.draw(ctx);
    }

    if (e.buttons === 2) {
      tile.erase(ctx);
    }
  }
};

document.onmouseup = () => {
  click = false;
};
