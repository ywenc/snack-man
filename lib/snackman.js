import MovingObject from './moving_object';

class SnackMan extends MovingObject {
  constructor(game) {
    super(game);
    this.pos = [250, 425];
    this.radius = 10;
    this.mouthOpen = true;
  }

  draw(ctx) {
    if (this.mouthOpen) {
      this.openMouth(ctx);
    } else {
      this.closeMouth(ctx);
    }

    this.mouthOpen = !this.mouthOpen;
  }

  openMouth(ctx) {
    const x = this.pos[0];
    const y = this.pos[1];
    const r = this.radius;

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(x, y, r,
      0, 2 * Math.PI, true);
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(x - 3, y - 2, 1.5,
      0, 2 * Math.PI, true);
    ctx.moveTo(x - 1, y);
    ctx.lineTo(x + 11, y - 3.5);
    ctx.lineTo(x + 11, y);
    ctx.fill();
  }

  closeMouth(ctx) {
    const x = this.pos[0];
    const y = this.pos[1];
    const r = this.radius;

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(x, y, r,
      0, 2 * Math.PI, true);
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(x - 3, y - 2, 1.5,
      0, 2 * Math.PI, true);
    ctx.fill();
  }
}

export default SnackMan;
