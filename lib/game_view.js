class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.update = this.update.bind(this);

    this.timer = 3;
  }

  init() {
    this.bindKeyHandlers();
    this.game.lvlMap.drawMaze(this.ctx);
    this.game.allMovingObjects().forEach((obj) => {
      obj.draw(this.ctx);
    });

    this.dialog('press N to start a new game');
  }

  dialog(text) {
    this.ctx.fillStyle = "#fff";
    this.ctx.font = "24px Courier New";
    this.ctx.fillText(text, 120, 345);
  }

  update() {
    this.game.moveObjects();
    this.game.draw(this.ctx);
    if (this.game.checkTouching() && this.game.lives > 0) {
      this.game.reset(this.ctx);
    } else if (this.game.checkTouching() && this.game.lives <= 0) {
      this.game.deathScreen(this.ctx);
    }
  }

  bindKeyHandlers() {
    let snackman = this.game.snackman[0];
    Object.keys(GameView.MOVES).forEach((k) => {
      let dir = GameView.MOVES[k];
      key(k, () => { snackman.logNextDir(dir); });
    });
  }

  start() {
    this.dialog('hello');
    this.game.draw(this.ctx);
    // setTimeout( () => {
    //   setInterval( () => this.update(), 120);
    // }, 1000);
    setInterval(this.update, 120);
  }
}

GameView.MOVES = {
  "w": "up",
  "a": "left",
  "s": "down",
  "d": "right",
   up: "up",
  left: "left",
  down: "down",
  right: "right"
};

export default GameView;
