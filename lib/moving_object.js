import Game from './game';

class MovingObject {
  constructor(game, location) {
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
      this.location[0] === obj.location[0] && this.location[1] === obj.location[1]
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
