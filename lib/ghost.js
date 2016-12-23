import MovingObject from './moving_object';

class Ghost extends MovingObject {
  constructor(game, location) {
    super(game, location);
    this.radius = game.spriteHeight - 5;
  }

  potentialMoves() {
    return this.nearbySqs().filter((sq) => {
      return this.node(sq).ghostPassageway();
    });
  }

  draw(ctx) {
    const x = this.pos[0];
    const y = this.pos[1];
    const r = this.radius;

    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(x, y, r,
      0, Math.PI, true);
    ctx.lineTo(x - r, y + r);
    ctx.lineTo(x - (2/3 * r), y + (2/3 * r));
    ctx.lineTo(x - (1/3 * r), y + r);
    ctx.lineTo(x, y + (2/3 * r));
    ctx.lineTo(x + (1/3 * r), y + r);
    ctx.lineTo(x + (2/3 * r), y + (2/3 * r));
    ctx.lineTo(x + r, y + r);
    ctx.fill();

    ctx.fillStyle = "white";

    ctx.beginPath();
    ctx.arc(x - 7, y - 2, 2.1, 2 * Math.PI,
      0, true);
    ctx.arc(x + 5, y - 2, 2.1,
      0, 2 * Math.PI, true);
    ctx.fill();
  }
}

export default Ghost;
