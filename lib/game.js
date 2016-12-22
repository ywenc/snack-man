import SnackMan from './snackman';
import Ghost from './ghost';

class Game {
  constructor() {
    this.snackman = new SnackMan(this);
    this.ghost = new Ghost(this);
  }

  allObjects() {
    return [].concat(this.snackman, this.ghost);
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
