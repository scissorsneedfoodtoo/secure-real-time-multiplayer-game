import { canvasCalcs } from './canvas-data.mjs';

class Player {
  constructor({ id, x = 10, y = 10, w = 30, h = 30, main }) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = 5;
    this.score = 0;
    this.id = id;
    this.movementDirection = {};
    this.isMain = main;
  }

  draw(context, coin, imgObj) {
    if (this.movementDirection.right) this.x + this.speed <= canvasCalcs.playFieldMaxX ? this.x += this.speed : this.x += 0;
    if (this.movementDirection.left) this.x - this.speed >= canvasCalcs.playFieldMinX ? this.x -= this.speed : this.x -= 0;
    if (this.movementDirection.up) this.y - this.speed >= canvasCalcs.playFieldMinY ? this.y -= this.speed : this.y -= 0;
    if (this.movementDirection.down) this.y + this.speed <= canvasCalcs.playFieldMaxY ? this.y += this.speed : this.y += 0;

    if (this.isMain) {
      context.font = `13px 'Press Start 2P'`;
      context.fillText(`Score: ${this.score}`, 570, 32.5);

      context.drawImage(imgObj.mainPlayer, this.x, this.y);
    } else {
      context.drawImage(imgObj.otherPlayer, this.x, this.y);
    }

    if (this.collide(coin)) {
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
