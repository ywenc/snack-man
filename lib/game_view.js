class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;

    this.update = this.update.bind(this);
  }

  update() {
    this.game.moveObjects();
    this.game.draw(this.ctx);
  }

  start() {
    setInterval(this.update, 135);
  }
}

export default GameView;
