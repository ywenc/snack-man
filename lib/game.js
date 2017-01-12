import SnackMan from './snackman';
import g1 from './ghosts/g1';
import g2 from './ghosts/g2';
import g3 from './ghosts/g3';
import g4 from './ghosts/g4';
import Map from './map';
import Maze0 from './mazes/maze0';
import Maze1 from './mazes/maze1';

class Game {
  constructor() {
    this.lives = -1;
    this.border = 24;
    this.dimX = 552;
    this.dimY = 625;
    this.spriteHeight = 12;
    this.lvlMap = new Map(this, Maze1);
    this.snackman = [new SnackMan(this)];
    this.ghosts = [].concat([new g2(this), new g1(this), new g3(this), new g4(this)]);
    this.eaten = 0;
  }

  mapCenter() {
    return this.lvlMap.mazeNodes[10][0].centerPos()[1];
  }

  allMovingObjects() {
    return [].concat(this.snackman, this.ghosts);
  }

  draw(ctx) {
    ctx.clearRect(this.border, this.border, this.dimX, this.dimY);
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(this.border, this.border, this.dimX, this.dimY);
    this.lvlMap.drawMaze(ctx);
    this.remainingLives(ctx);

    this.allMovingObjects().forEach((obj) => {
      obj.draw(ctx);
    });
  }

  reset(ctx) {
    ctx.clearRect(this.border, this.border, this.dimX, this.dimY);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(this.border, this.border, this.dimX, this.dimY);
    //
    this.allMovingObjects().forEach((obj) => {
      obj.reset();
    });
  }

  newMap() {
    this.lives = 3;
    this.resetLocs();
    this.lvlMap.mazeNodes.forEach((arr) => {
      arr.forEach((node) => node.visited = false);
    });
  }

  resetLocs() {
    this.allMovingObjects().forEach((obj) => {
      obj.resetLoc();
      obj.inJail = true;
    });
  }

  moveObjects(ctx) {
    this.allMovingObjects().forEach((obj) => {
      obj.move();
    });
  }

  snackmanDead() {
    let dead = false;

    this.ghosts.forEach((ghost) => {
      if (this.snackman[0].isTouching(ghost)) {
        if (this.snackman[0].invincible) {
          ghost.inJail = true;
          ghost.isEaten();
        } else {
          dead = true;
        }
      }
    });

    return dead;
  }

  checkWon() {
    return this.eaten === this.lvlMap.edibles;
  }

  isOutOfBounds(pos) {
    return (pos[0] < this.border) || (pos[1] < this.border) ||
      (pos[0] > this.xBounds) || (pos[1] > this.yBounds);
  }

  remainingLives(ctx) {
    const r = this.snackman[0].radius;

    for (let x = 0; x < this.lives; x++) {
      ctx.fillStyle = '#fffac1';
      ctx.beginPath();
      ctx.arc((this.dimX - 2.5 * x * r - r),
        (this.dimY),
        r,
        0, 2 * Math.PI, true);
      ctx.fill();
      ctx.fillStyle = "#1a1a1a";
      ctx.beginPath();
      ctx.moveTo(this.dimX - 2.5 * x * r - r, this.dimY);
      ctx.lineTo(this.dimX - 2.5 * x * r + 1, this.dimY - r);
      ctx.lineTo(this.dimX - 2.5 * x * r + 1, this.dimY);
      ctx.fill();
    }
  }
}

export default Game;
