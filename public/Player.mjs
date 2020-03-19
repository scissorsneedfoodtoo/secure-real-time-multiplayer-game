import { movePlayer } from './helper-functions.mjs';

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
    let currPos = { x: this.x, y: this.y }

    const currKeys = Object.keys(this.movementDirection).filter(k => this.movementDirection[k]);
    currKeys.forEach(key => currPos = movePlayer(key, this.speed, currPos));

    // if (this.movementDirection['D']) currPos = movePlayer('D', this.speed, currPos);
    // if (this.movementDirection['A']) currPos = movePlayer('A', this.speed, currPos);
    // if (this.movementDirection['W']) currPos = movePlayer('W', this.speed, currPos);
    // if (this.movementDirection['S']) currPos = movePlayer('S', this.speed, currPos);

    this.x = currPos.x;
    this.y = currPos.y;

    if (this.isMain) {
      context.font = `13px 'Press Start 2P'`;
      context.fillText(`Score: ${this.score}/25`, this.score < 10 ? 555 : 550, 32.5);

      context.drawImage(imgObj.mainPlayer, this.x, this.y);
    } else {
      context.drawImage(imgObj.otherPlayer, this.x, this.y);
    }

    if (this.collide(coin)) {
      coin.destroyed = this.id;
    }
  }

  moveDir(dir) {
    this.movementDirection[dir] = true;
  }

  stopDir(dir) {
    this.movementDirection[dir] = false;
  }

  collide(p) {
    if (
      (this.x < p.x + p.w &&
        this.x + this.w > p.x &&
        this.y < p.y + p.h &&
        this.y + this.h > p.y)
    )
      return true;
  }
}

export default Player;
