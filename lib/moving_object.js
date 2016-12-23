import Game from './game';

class MovingObject {
  constructor(game) {
    this.vel = [1, 1];
    this.game = game;
    this.isWrappable = false;
    this.mazeNodes = game.lvlMap.mazeNodes;
  }

  wrap() {
    const xBounds = this.game.dimX;
    const yBounds = this.game.dimY;
    const border = this.game.border;

    if (this.pos[1] === yBounds / 2) {
      this.isWrappable = true;
    } else {
      this.isWrappable = false;
    }

    if (this.isWrappable) {
      if (this.pos[0] < border + 2 * this.radius) {
        this.pos[0] = xBounds - this.pos[0] - 2 * this.radius;
      } else if (this.pos[0] > xBounds - this.radius) {
        this.pos[0] = border + (2 * this.radius) + ((this.pos[0] + this.radius) % xBounds);
      }
    } else {
    if (this.pos[0] < border + (2 * this.radius)) {
        this.pos[0] = border + 2 * this.radius;
      } else if (this.pos[0] > xBounds - 2 * this.radius) {
        this.pos[0] = xBounds - 2 * this.radius;
      } else if (this.pos[1] > yBounds - 2 * this.radius) {
        this.pos[1] = yBounds - 2 * this.radius;
      } else if (this.pos[1] < border + 2 * this.radius) {
        this.pos[1] = border + 2 * this.radius;
      }
    }
  }

  isTouching(obj) {
    return (
      (Math.abs(this.pos[0] - obj.pos[0]) <= (this.radius + obj.radius) &&
      (this.pos[1] === obj.pos[1])) ||
      (Math.abs(this.pos[1] - obj.pos[1]) <= (this.radius + obj.radius) &&
      (this.pos[0] === obj.pos[0]))
    );
  }
}

export default MovingObject;
