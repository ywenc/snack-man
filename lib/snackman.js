import MovingObject from './moving_object';

class SnackMan extends MovingObject {
  constructor(game) {
    super(game);
    this.color = '#000000';
    this.pos = this.mazeNodes[23][14].spriteStart();
    this.radius = game.spriteHeight;
    this.mouthOpen = true;
    this.dir = "right";
  }

  draw(ctx) {
    if (this.mouthOpen) {
      this.openMouth(ctx);
    } else {
      this.closeMouth(ctx);
    }

    this.mouthOpen = !this.mouthOpen;
  }

  reset() {
    this.pos = this.mazeNodes[23][14].spriteStart();
    this.mouthOpen = true;
    this.dir = "right";
  }

  move() {
    const offsetX = this.vel[0] * 1000/60;
    const offsetY = this.vel[1] * 1000/60;

    switch(this.dir) {
      case "right":
        this.pos = [this.pos[0] + offsetX, this.pos[1]];
        break;
      case "left":
        this.pos = [this.pos[0] - offsetX, this.pos[1]];
        break;
      case "up":
        this.pos = [this.pos[0], this.pos[1] - offsetY];
        break;
      case "down":
        this.pos = [this.pos[0], this.pos[1] + offsetY];
        break;
      default:
        console.log(':(');
    }
  }

  changeDir(dir) {
    this.vel = [1, 1];
    this.dir = dir;
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
