# snack-man
A clone of the popular arcade game Pac-Man.

[snack-man Live](http://www.yywenc.com/snack-man)

### Background
Pac-Man with more snacks! The player controls snack-man through a maze, eating snack-dots. snack-man wins when all pac-dots are eaten. snack-man must avoid ghosts, or he will lose a life. Eating a big snack-dot gives him the temporary ability to eat his ghosts.

### Functionality & MVP
Users will be able to
- [ ] Start, pause, and reset the game board
- [ ] Move around the board with arrow keys

### Wireframes

This app will consist of a single screen with game board, game controls, and nav links to the Github and my LinkedIn.  Game controls will include Start, Pause, and Reset buttons. Player moves around the board with arrow keys.

### Architecture and Technologies

This project will be implemented with the following technologies:

- Vanilla JavaScript
- `HTML5 Canvas` for DOM manipulation and rendering,
- Webpack to bundle and serve up the various scripts.

### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up and running and `Canvas.js` installed.  Create `webpack.config.js` as well as `package.json`.  Write a basic entry file and the bare bones of all 3 scripts outlined above.  Refresh knowledge of `Canvas.js`. Set up `Board` object. Create controls for new board, pause, and reset.

**Day 2**: Build ghost and snack-man objects. Connect them to the `Board` object. Set up snack-man to move automatically until the edges of the board.

**Day 3**: Create snack-man's movement logic. Create logic for allowing snack-man to eat the ghosts.

### Bonus features

Additional features can include:

- [ ] Different color schemes
- [ ] randomized board set up
