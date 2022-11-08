export default class Tile {
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
