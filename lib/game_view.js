class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.update = this.update.bind(this);
    this.timer = 3.5;
    this.ticker = false;
  }

  init() {
    this.bindKeyHandlers();
    this.drawStatic();

    this.dialog('press N to start a new game');
  }

  drawStatic() {
    this.game.lvlMap.drawMaze(this.ctx);
    this.game.draw(this.ctx);
    this.game.remainingLives(this.ctx);
  }

  dialog(text) {
    this.ctx.fillStyle = "#fff";
    this.ctx.font = "24px Courier New";
    this.ctx.fillText(text, 120, 345);
  }

  update() {
    if (!this.game.checkTouching()) {
      this.game.moveObjects(this.ctx);
      console.log('kasdhs')
      this.game.draw(this.ctx);
    }

    if (this.game.checkTouching() && this.game.lives > 0) {
      clearInterval(this.ticker);
      this.game.reset(this.ctx);
      this.game.lives -= 1;
      this.timer = 3.5;
      this.drawStatic();
      this.countdown();
      setTimeout(() => {
        this.game.resetLocs();
      }, 1500);
      this.start();
    } else if (this.game.checkTouching() && this.game.lives < 1) {
      clearInterval(this.ticker);
      this.game.deathScreen(this.ctx);
    }

  }

  bindKeyHandlers() {
    let snackman = this.game.snackman[0];

    Object.keys(GameView.NEW).forEach((n) => {
      key(n, () => {
        this.countdown();
        this.start();
      });
    });

    Object.keys(GameView.MOVES).forEach((k) => {
      let dir = GameView.MOVES[k];
      key(k, () => { snackman.logNextDir(dir); });
    });

  }

  countdown() {
    const id = setInterval(() => {
      this.drawStatic();
      this.dialog(`game starting in ${Math.floor(this.timer)}`);
      this.timer -= 0.5;
      if (this.timer <= 1) clearInterval(id);
    }, 500);
  }

  start() {
    setTimeout( () => {
      this.game.resetLocs();
      clearInterval(this.ticker);
      this.ticker = setInterval( () => {
        this.update();
      }, 160);
    }, 2500);
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
  right: "right",
};

GameView.NEW = {
  "n": "new",
  "N": "new"
};

export default GameView;
