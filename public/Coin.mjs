class Coin {
  constructor({ x = 10, y = 10, w = 15, h = 15, val = 1, id }) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.val = val;
    this.id = id;
  }

  draw(context, imgObj) {
    if (this.val === 1) {
      context.drawImage(imgObj.bronzeCoin, this.x, this.y);
    } else if (this.val === 2) {
      context.drawImage(imgObj.silverCoin, this.x, this.y);
    } else {
      context.drawImage(imgObj.goldCoin, this.x, this.y);
    }
  }
}

/* 
  module.exports for testing / use in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/
try {
  module.exports = Coin;
} catch(e) {}

export default Coin;
