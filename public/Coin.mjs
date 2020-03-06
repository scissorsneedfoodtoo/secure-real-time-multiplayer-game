class Coin {
  constructor({ x = 10, y = 10, w = 10, h = 15, id }) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.value = 1;
    this.id = id;
  }

  draw(context) {
    context.beginPath();
    context.fillStyle = 'yellow';
    context.fillRect(this.x, this.y, this.w, this.h);
  }
}

export default Coin;
