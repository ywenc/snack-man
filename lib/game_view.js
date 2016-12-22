class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;

    this.update = this.update.bind(this);
  }

  update() {
    this.game.moveObjects();
    this.game.draw(this.ctx);

    if (this.game.checkTouching() && this.game.lives >= 0) {
      this.game.reset(this.ctx);
    } else if (this.game.checkTouching() && this.game.lives < 0) {
      this.game.deathScreen(this.ctx);
    }
  }

  start() {
    setInterval(this.update, 100);
  }
}

export default GameView;
