class Player {
  constructor({ id, x = 10, y = 10, w = 30, h = 30, color = "white", main }) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = 4;
    this.score = 0;
    this.id = id;
    this.color = color;
    this.movementDirection = {};
    this.isMain = main;
  }

  draw(context, coin) {
    if (this.movementDirection.right) this.x += this.speed;
    if (this.movementDirection.left) this.x -= this.speed;
    if (this.movementDirection.up) this.y -= this.speed;
    if (this.movementDirection.down) this.y += this.speed;

    context.beginPath();
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.w, this.h);

    if (this.isMain) {
      context.font = '20px ariel';
      context.fillText('Score: ' + this.score, 560, 30);
    }

    if (this.collide(coin)) {
      this.score += coin.value;
      coin.destroyed = this.id;
    }
  }

  move(dir) {
    this.movementDirection[dir] = true;
  }

  stop(dir) {
    this.movementDirection[dir] = false;
  }

  collide(p) {
    if (
      (this.x >= p.x &&
        this.x <= p.x + p.w &&
        this.y >= p.y &&
        this.y <= p.y + p.h) ||
      (this.x + this.w >= p.x &&
        this.x + this.w <= p.x + p.w &&
        this.y >= p.y &&
        this.y <= p.y + p.h) ||
      (this.x >= p.x &&
        this.x <= p.x + p.w &&
        this.y + this.h >= p.y &&
        this.y + this.h <= p.y + p.h) ||
      (this.x + this.w >= p.x &&
        this.x + this.w <= p.x + p.w &&
        this.y + this.h >= p.y &&
        this.y + this.h <= p.y + p.h) ||
      (p.x >= this.x &&
        p.x <= this.x + this.w &&
        p.y >= this.y &&
        p.y <= this.y + this.h) ||
      (p.x + p.w >= this.x &&
        p.x + p.w <= this.x + this.w &&
        p.y >= this.y &&
        p.y <= this.y + this.h) ||
      (p.x >= this.x &&
        p.x <= this.x + this.w &&
        p.y + p.h >= this.y &&
        p.y + p.h <= this.y + this.h) ||
      (p.x + p.w >= this.x &&
        p.x + p.w <= this.x + this.w &&
        p.y + p.h >= this.y &&
        p.y + p.h <= this.y + this.h)
    )
      return true;
  }
}

export default Player;
