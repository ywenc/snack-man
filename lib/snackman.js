import MovingObject from './moving_object';
import * as Util from './util';

class SnackMan extends MovingObject {
  constructor(game) {
    super(game, [16, 10]);
    this.color = '#fffac1';
    this.pos = this.node([16, 10]).centerPos();
    this.radius = game.spriteHeight - 1;
    this.mouthOpen = true;
    this.dir = "left";
    this.nextDir = "left";
    this.invincible = false;
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

  resetLoc() {
    this.location = [16, 10];
  }

  move() {
    this.checkDir();
    const newLoc = Util.checkNewLoc(this.location, this.dir);

    if (this.node(newLoc).snackmanPassageway()) {
      this.pos = this.node(newLoc).centerPos();
      this.location = newLoc;

      if (this.node(newLoc).sym === "O" && !this.node(newLoc).visited) {
        this.game.ghosts.forEach((ghost) => {
          const tempCol = ghost.color;
          this.invincible = true;
          ghost.weak = true;
          ghost.color = 'blue';
          setTimeout(() => {
            ghost.flashing = true;
          }, 3000);
          
          setTimeout(() => {
            ghost.color = tempCol;
            ghost.weak = false;
            ghost.flash = false;
            ghost.flashing = false;
            this.invincible = false;
          }, 5000);
        });
      }

      if (this.node(newLoc).visited === false) {
        this.node(newLoc).visited = true;
        this.game.eaten += 1;
      }

    }
  }

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

  openMouth(ctx, mouth, eye) {
    const x = this.pos[0];
    const y = this.pos[1];
    const r = this.radius;

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(x, y, r,
      0, 2 * Math.PI, true);
    ctx.fill();

    ctx.fillStyle = "#1a1a1a";
    ctx.beginPath();
    switch(this.dir) {
      case ("right"):
        ctx.arc(x - 3, y - 2, 1.5,
          0, 2 * Math.PI, true);
        ctx.moveTo(x, y);
        ctx.lineTo(x + this.radius, y - 6.5);
        ctx.lineTo(x + this.radius, y + 6.5);
        break;
      case ("left"):
        ctx.arc(x + 3, y - 2, 1.5,
          0, 2 * Math.PI, true);
        ctx.moveTo(x, y);
        ctx.lineTo(x - this.radius, y - 6.5);
        ctx.lineTo(x - this.radius, y + 6.5);
        break;
      case ("down"):
        ctx.arc(x + 3, y - 2, 1.5,
          0, 2 * Math.PI, true);
        ctx.moveTo(x, y);
        ctx.lineTo(x - 6.5, y + this.radius);
        ctx.lineTo(x + 6.5, y + this.radius);
        break;
      case ("up"):
        ctx.arc(x + 3, y + 2, 1.5,
          0, 2 * Math.PI, true);
        ctx.moveTo(x, y);
        ctx.lineTo(x + 6.5, y - this.radius);
        ctx.lineTo(x - 6.5, y - this.radius);
        break;
      default:
        console.log(":(");
    }
    ctx.fill();
  }

  closeMouth(ctx, mouth, eye) {
    const x = this.pos[0];
    const y = this.pos[1];
    const r = this.radius;

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(x, y, r,
      0, 2 * Math.PI, true);
    ctx.fill();

    ctx.fillStyle = "#1a1a1a";
    ctx.beginPath();
    switch(this.dir) {
      case ("right"):
        ctx.arc(x - 3, y - 2, 1.5,
          0, 2 * Math.PI, true);
        break;
      case ("left"):
        ctx.arc(x + 3, y - 2, 1.5,
          0, 2 * Math.PI, true);
        break;
      case ("down"):
        ctx.arc(x + 3, y - 2, 1.5,
          0, 2 * Math.PI, true);
        break;
      case ("up"):
        ctx.arc(x + 3, y + 2, 1.5,
          0, 2 * Math.PI, true);
        break;
      default:
        console.log(":(");
      }

    ctx.fill();
  }
}

export default SnackMan;
