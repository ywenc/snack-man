import SnackMan from './snackman';
import g1 from './g1';
import g2 from './g2';
import g3 from './g3';
import g4 from './g4';
import Maze from './maze';

class Game {
  constructor() {
    this.snackman = [new SnackMan(this)];
    this.ghosts = [].concat(new g1(this), new g2(this), new g3(this), new g4(this));
    this.maze = [new Maze(this)];
    this.lives = 3;
  }

  allObjects() {
    return [].concat(this.snackman, this.ghosts);
  }

  draw(ctx) {
    ctx.clearRect(0, 0, 1500, 1000);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(50, 50, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach((obj) => {
      obj.draw(ctx);
    });
  }

  // remainingLives() {
  //   for (x = this.lives; x )
  //
  //   ctx.fillStyle = '#ffffff';
  //   const r = this.snackman.radius;
  //   ctx.beginPath();
  //   ctx.arc(Game.BORDER,
  //     (Game.DIM_Y + 10),
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

  deathScreen(ctx) {
    ctx.clearRect(0, 0, 1500, 1000);
    ctx.fillStyle = 'black';
    ctx.fillRect(50, 50, Game.DIM_X, Game.DIM_Y);
  }

  reset(ctx) {
    this.lives -= 1;
    ctx.clearRect(0, 0, 1500, 1000);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(50, 50, Game.DIM_X, Game.DIM_Y);

    this.snackman = [new SnackMan(this)];
    this.ghosts = [].concat(new g1(this), new g2(this), new g3(this), new g4(this));
    this.maze = [new Maze(this)];
  }

  moveObjects() {
    this.allObjects().forEach((obj) => {
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
    return (pos[0] < 50) || (pos[1] < 50) ||
      (pos[0] > 450) || (pos[1] > 550);
  }
}

Game.BORDER = 50;
Game.DIM_X = 400;
Game.DIM_Y = 500;

export default Game;
