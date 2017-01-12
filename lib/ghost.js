import MovingObject from './moving_object';
import * as Util from './util';

class Ghost extends MovingObject {
  constructor(game, location) {
    super(game, location);
    this.radius = game.spriteHeight - 1;
    this.snackman = this.game.snackman[0];
    this.maze = this.game.maze;
    this.weak = false;
    this.flash = false;
    this.flashing = false;
    this.inJail = true;
    this.color = "white";
    this.strColor = "black";
  }

  potentialMoves(location) {
    return this.nearbySqs(location).filter((loc) =>
      loc.ghostPassageway()
    );
  }

  leavePen() {
    if (this.location[0] === 10) {
      if (this.location[1] === 10) {
        setTimeout(() => {
          this.pos = this.node(this.location).centerPos();
          this.location = [9, 10];
        }, 500);
      } else if (this.location[1] === 9) {
          setTimeout(() => {
            this.pos = this.node(this.location).centerPos();
            this.location = [10, 10];
          }, 1000);
      } else if (this.location[1] === 11) {
        setTimeout(() => {
          this.pos = this.node(this.location).centerPos();
          this.location = [10, 10];
        }, 2000);
      }
    } else {
      this.inJail = false;
    }
  }

  moveRegularly() {
    const newLoc = Util.checkNewLoc(this.location, this.dir);

    if (this.node(newLoc).ghostPassageway()) {
      this.pos = this.node(newLoc).centerPos();
      this.location = newLoc;
    } else {
      this.changeDir(this.dir);
    }
  }

  move() {
    if (this.inJail) {
      this.leavePen();
    } else {
      this.moveRegularly();
    }
  }

  changeDir(dir) {
    let newDirs;
    let randDir;
    switch(dir) {
      case 'left':
      case 'right':
        newDirs = ['up', 'down'];
        randDir = Math.random() > 0.5 ? newDirs.pop() : newDirs.shift();
        let possibleLoc = Util.checkNewLoc(this.location, randDir);
        this.dir = this.node(possibleLoc).ghostPassageway() ? randDir : newDirs[0];
        break;
      case 'up':
      case 'down':
        newDirs = ['left', 'right'];
        randDir = Math.random() > 0.5 ? newDirs.pop() : newDirs.shift();
        possibleLoc = Util.checkNewLoc(this.location, randDir);
        this.dir = this.node(possibleLoc).ghostPassageway() ? randDir : newDirs[0];
        break;
      default:
        console.log(':C');
    }
  }

  draw(ctx) {
    const x = this.pos[0];
    const y = this.pos[1];
    const r = this.radius;

    ctx.fillStyle = this.flash ? 'white' : this.color;

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

    if (this.flashing) {
      this.flash = !this.flash;
    }
  }

  isEaten() {
    this.location = [10, 10];
    this.pos = this.node(this.location).centerPos();
  }
}

export default Ghost;
