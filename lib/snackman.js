import MovingObject from './moving_object';
import * as Util from './utils';

class SnackMan extends MovingObject {
  constructor(game) {
    super(game, [16, 10]);
    this.color = '#000000';
    this.pos = this.node([16, 10]).centerPos();
    this.radius = game.spriteHeight - 1;
    this.mouthOpen = true;
    this.dir = "right";
    this.nextDir = "right";
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
    this.pos = this.node([16, 10]).centerPos();
    this.mouthOpen = true;
    this.dir = "right";
  }

  move() {
    this.checkDir();
    const newLoc = Util.move(this.location, this.dir);

    if (this.node(newLoc).snackmanPassageway()) {
      this.pos = this.node(newLoc).centerPos();
      this.location = newLoc;
      this.node(newLoc).visited = true;
    }
  }

  potentialMoves() {
    return this.nearbySqs().filter((sq) => {
      return this.node(sq).snackPassageway();
    });
  }

  logNextDir(dir) {
    this.nextDir = dir;
  }

  checkDir() {
    const [row, col] = this.location;
    let potentialLoc;

    switch(this.nextDir) {
      case "right":
        potentialLoc = [row, col + 1];
        break;
      case "left":
        potentialLoc = [row, col - 1];
        break;
      case "up":
        potentialLoc = [row - 1, col];
        break;
      case "down":
        potentialLoc = [row + 1, col];
        break;
      default:
        console.log(':(');
    }

    if (this.node(potentialLoc).snackmanPassageway()) {
      this.dir = this.nextDir;
    }
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
    ctx.lineTo(x + 15, y - 3.5);
    ctx.lineTo(x + 15, y);
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
