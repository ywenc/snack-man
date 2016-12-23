import Game from './game';

class MovingObject {
  constructor(game, location) {
    this.vel = [1, 1];
    this.game = game;
    this.location = location;
    this.isWrappable = false;
    this.mazeNodes = game.lvlMap.mazeNodes;
  }

  node(loc) {
    const [row, col]= loc;
    return this.mazeNodes[row][col];
  }

  nearbySqs() {
    const row = this.location[0];
    const col = this.location[1];
    const maxRowIdx = this.mazeNodes.length - 1;
    const maxColIdx = this.mazeNodes[0].length - 1;

    return [
      [Math.min(row + 1, maxRowIdx), col],
      [row, Math.min(col + 1, maxColIdx)],
      [Math.max(row + 1, maxRowIdx), col],
      [row, Math.max(col - 1, maxColIdx)]
    ];
  }

  wrap() {
    const xBounds = this.game.dimX;
    const yBounds = this.game.dimY;
    const border = this.game.border;

    if (this.pos[1] === this.game.mapCenter()) {
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
