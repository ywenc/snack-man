#Snack-Man
[Snack-Man Live](http://www.yywenc.com/snack-man)

## Instructions
#### Gameplay
A clone of the arcade game Pac-Man! Eat all the pellets in the maze without getting eaten by a ghost. Eating a large pellet will make you invincible to the ghosts. Eat them when they turn blue.

#### Controls
- "N" to start a new game.
- The arrow keys will control Pac-Man's direction.

## Main technologies
- HTML5/CSS3
- HTML 5 Canvas
- JavaScript ES6
- Object-Oriented Programming

## Features and Implementation
### Maze Generator
The maze is generated dynamically using a function to turn each cell into a node. This allows for new levels to be easily and quickly generated. It also allows for pathfinding algorithms to be implemented in the future.
```javascript
setUpMaze() {
  const spriteHeight = this.game.spriteHeight;
  let xStart = 48;
  let yStart = 48;

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
    xStart = 48;
    yStart += 2 * spriteHeight + 1;
  }
}

drawMaze(ctx) {
  this.edibles = 0;
  this.mazeNodes.forEach((row) => {
    row.forEach((mazeNode) => {
      mazeNode.draw(ctx);
      if (mazeNode.sym === '.' || mazeNode.sym === 'O') {
        this.edibles += 1;
      }
    });
  });
}
```

## Future Features
- High Scores, saved locally within the browser
- New Maze layouts for different levels
