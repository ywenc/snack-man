import MovingObject from './moving_object';
import * as Util from './utils';

class SnackMan extends MovingObject {
  constructor(game) {
    super(game, [16, 10]);
    this.color = '#000000';
    this.pos = this.node([16, 10]).centerPos();
    this.radius = game.spriteHeight - 1;
    this.mouthOpen = true;
    this.dir = "left";
    this.nextDir = "left";
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
    const newLoc = Util.checkNewLoc(this.location, this.dir);

    if (this.node(newLoc).snackmanPassageway()) {
      this.pos = this.node(newLoc).centerPos();
      this.location = newLoc;
      this.node(newLoc).visited = true;
    }
  }
  //
  // potentialMoves() {
  //   console.log(Util.nearbySqs());
  //   return Util.nearbySqs(this.location).filter((sq) => {
  //     return this.node(sq).snackPassageway();
  //   });
  // }

  logNextDir(dir) {
    this.nextDir = dir;
  }

  checkDir() {
    const [row, col] = this.location;
    let potentialLoc;

    const newLoc = Util.checkNewLoc(this.location, this.nextDir);

    if (this.node(newLoc).snackmanPassageway()) {
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
    ctx.lineTo(x + this.radius, y - 3.5);
    ctx.lineTo(x + this.radius, y);
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
