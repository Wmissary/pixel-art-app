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
  clear(ctx) {
    ctx.clearRect(this.x, this.y, this.width, this.height);
  }
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let click = false;

canvas.onmousedown = (e) => {
  const color = document.getElementById("color").value;

  const x = Math.floor(
    e.offsetX / (parseInt(getComputedStyle(canvas).width) / 16)
  );
  const y = Math.floor(
    e.offsetY / (parseInt(getComputedStyle(canvas).width) / 16)
  );
  const tile = new Tile({ x, y, color });
  tile.draw(ctx);

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
    tile.draw(ctx);
  }
};

document.onmouseup = () => {
  click = false;
};
