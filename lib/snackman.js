import MovingObject from './moving_object';

class SnackMan extends MovingObject {
  constructor(game) {
    super(game, [23, 14]);
    this.color = '#000000';
    this.location = [23, 14];
    this.pos = this.node([23, 14]).spriteStart();
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
    this.pos = this.node([23, 14]).spriteStart();
    this.mouthOpen = true;
    this.dir = "right";
  }

  move() {
    const [row, col] = this.location;
    let potentialLoc;

    switch(this.dir) {
      case "right":
        potentialLoc = [row, Math.min(col + 1, 27)];
        break;
      case "left":
        potentialLoc = [row, Math.max(col - 1, 27)];
        break;
      case "up":
        potentialLoc = [Math.max(row - 1, 30), col];
        break;
      case "down":
        potentialLoc = [Math.min(row + 1, 30), col];
        break;
      default:
        console.log(':(');
    }

    if (this.node(potentialLoc).snackmanPassageway()) {
      this.pos = this.node(potentialLoc).centerPos();
      this.location = potentialLoc;
    }
  }

  potentialMoves() {
    return this.nearbySqs().filter((sq) => {
      return this.node(sq).snackPassageway();
    });
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
    ctx.lineTo(x + 9, y - 3.5);
    ctx.lineTo(x + 9, y);
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
