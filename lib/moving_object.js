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
