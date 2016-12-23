import SnackMan from './snackman';
import g1 from './ghosts/g1';
import g2 from './ghosts/g2';
import g3 from './ghosts/g3';
import g4 from './ghosts/g4';
import Map from './map';
import Maze0 from './mazes/maze0';

class Game {
  constructor() {
    this.lives = 3;
    this.border = 15;
    this.dimX = 538;
    this.dimY = 623;
    this.spriteHeight = 9;
    this.lvlMap = new Map(this, Maze0);
    this.snackman = [new SnackMan(this)];
    this.ghosts = [].concat(new g1(this));
    this.ghosts = [].concat(new g1(this), new g2(this), new g3(this), new g4(this));
  }

  allMovingObjects() {
    return [].concat(this.snackman, this.ghosts);
  }

  draw(ctx) {
    ctx.clearRect(this.border, this.border, this.dimX, this.dimY);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(this.border, this.border, this.dimX, this.dimY);

    this.lvlMap.drawMaze(ctx);
    this.allMovingObjects().forEach((obj) => {
      obj.draw(ctx);
    });
  }

  deathScreen(ctx) {
    ctx.clearRect(this.border, this.border, this.dimX, this.dimY);
    ctx.fillStyle = 'black';
    ctx.fillRect(this.border, this.border, this.dimX, this.dimY);
  }

  reset(ctx) {
    this.lives -= 1;
    ctx.clearRect(this.border, this.border, this.dimX, this.dimY);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(this.border, this.border, this.dimX, this.dimY);

    this.allMovingObjects().forEach((obj) => {
      obj.reset();
    });
  }

  moveObjects() {
    this.allMovingObjects().forEach((obj) => {
      obj.move();
      obj.wrap();
    });
  }

  checkTouching() {
    let touching = false;

    this.ghosts.forEach((ghost) => {
      if (ghost.isTouching(this.snackman[0])) {
        touching = true;
      }
    });

    return touching;
  }

  isOutOfBounds(pos) {
    return (pos[0] < this.border) || (pos[1] < this.border) ||
      (pos[0] > this.xBounds) || (pos[1] > this.yBounds);
  }


  // remainingLives() {
  //   for (x = this.lives; x )
  //
  //   ctx.fillStyle = '#ffffff';
  //   const r = this.snackman.radius;
  //   ctx.beginPath();
  //   ctx.arc(Game.border,
  //     (Game.dimY + 10),
  //     this.snackman.radius,
  //     0, 2 * Math.PI, true);
  //   ctx.fill();
  //   ctx.fillStyle = "black";
  //   ctx.beginPath();
  //   ctx.moveTo(x - 1, y);
  //   ctx.lineTo(x + 11, y - 3.5);
  //   ctx.lineTo(x + 11, y);
  //   ctx.fill();
  // }

}

export default Game;
