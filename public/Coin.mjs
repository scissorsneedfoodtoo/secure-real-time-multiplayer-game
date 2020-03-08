class Coin {
  constructor({ x = 10, y = 10, w = 10, h = 14, val = 1 }) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.val = val;
  }

  draw(context) {
    context.beginPath();
    if (this.val === 1) {
      context.fillStyle = '#f09d54'; // bronze
    } else if (this.val === 2) {
      context.fillStyle = '#D3D3D3'; // silver
    } else {
      context.fillStyle = 'yellow'; // gold
    }
    context.fillRect(this.x, this.y, this.w, this.h);
  }
}

export default Coin;
