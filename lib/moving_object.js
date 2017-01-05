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

  nearbySqs(location) {
    const row = location[0];
    const col = location[1];

    const maxRowIdx = this.mazeNodes[0].length - 1;

    const moves = [
      [row + 1, col],
      [row, (col + 1) % 21],
      [row - 1, col],
      [row, (col - 1) % 21]
    ];

    return moves.map((move) => this.node(move));
  }
}

export default MovingObject;
