class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;

    this.update = this.update.bind(this);
  }

  update() {
    // this.game.moveObjects();
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
      key(k, () => { snackman.changeDir(dir); });
    });
  }

  start() {
    this.bindKeyHandlers();
    setInterval(this.update, 200);
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
