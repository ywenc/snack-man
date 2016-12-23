import mazeNode from './maze_node';

class Map {
  constructor(game, maze) {
    this.game = game;
    this.maze = maze;
    this.mazeNodes = [];

    this.setUpMaze();
  }

  setUpMaze() {
    const spriteHeight = this.game.spriteHeight;
    let xStart = 30;
    let yStart = 30;

    for (let x = 0; x < this.maze.length; x++) {
      let row = [];
      for (let y = 0; y < this.maze[0].length; y++) {
        row.push(new mazeNode(
          [x, y],
          [xStart, yStart],
          this.maze[x][y],
          spriteHeight)
        );

        xStart += 2 * spriteHeight;
      }
      this.mazeNodes.push(row);
      xStart = 30;
      yStart += 2 * spriteHeight + 1;
    }
  }

  drawMaze(ctx) {
    this.mazeNodes.forEach((row) => {
      row.forEach((mazeNode) => {
        mazeNode.draw(ctx);
      });
    });
  }
}

export default Map;
