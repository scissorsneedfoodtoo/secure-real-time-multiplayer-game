class Coin {
  constructor({ x = 10, y = 10, w = 15, h = 15, val = 1 }) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.val = val;
  }

  draw(context, imgObj) {
    // context.beginPath();
    if (this.val === 1) {
      context.drawImage(imgObj.bronzeCoin, this.x, this.y);
    } else if (this.val === 2) {
      context.drawImage(imgObj.silverCoin, this.x, this.y);
    } else {
      context.drawImage(imgObj.goldCoin, this.x, this.y);
    }
    
    // context.fillRect(this.x, this.y, this.w, this.h);
  }
}

export default Coin;
