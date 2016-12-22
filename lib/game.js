import SnackMan from './snackman';
import g1 from './g1';
import g2 from './g2';
import g3 from './g3';
import g4 from './g4';
import Maze from './maze';

class Game {
  constructor() {
    this.snackman = new SnackMan(this);
    this.ghosts = [].concat(new g1(this), new g2(this), new g3(this), new g4(this));
    this.maze = new Maze(this);
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

  moveObjects() {
    this.allObjects().forEach((obj) => obj.move());
  }

  isOutOfBounds(pos) {
    return (pos[0] < 60) || (pos[1] < 60) ||
      (pos[0] > 430) || (pos[1] > 540);
  }
}

Game.BORDER = 50;
Game.DIM_X = 400;
Game.DIM_Y = 500;

export default Game;
