class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.update = this.update.bind(this);
    this.timer = 3;
    this.ticker = false;
  }

  init() {
    this.bindKeyHandlers();
    this.drawStatic();

    this.dialog('press N to start a new game');
  }

  drawStatic() {
    this.game.reset(this.ctx);
    this.game.lvlMap.drawMaze(this.ctx);
    this.game.draw(this.ctx);
    this.game.remainingLives(this.ctx);
  }

  dialog(text, bottomtext) {
    this.ctx.fillStyle = "#fff";
    this.ctx.font = "24px Courier New";
    const width = this.ctx.measureText(text).width;
    this.ctx.fillText(text, this.game.border + ((this.game.dimX - width) / 2), this.game.dimY / 2);

    if (bottomtext) {
      const btmwidth = this.ctx.measureText(bottomtext).width;
      this.ctx.fillText(bottomtext, this.game.border + ((this.game.dimX - btmwidth) / 2), this.game.dimY / 2 + 30);
    }
  }

  update() {
    if (this.game.checkWon()) {
      this.winScreen();
    } else if (this.game.snackmanDead()) {
      if (this.game.lives > 0) {
        clearInterval(this.ticker);
        this.game.reset(this.ctx);
        this.game.lives -= 1;
        this.timer = 3;
        this.drawStatic();
        this.countdown();
        this.start();
      } else {
        clearInterval(this.ticker);
        this.game.lives -= 1;
        this.deathScreen();
      }
    } else if (this.game.lives >= 0) {
      this.game.moveObjects(this.ctx);
      this.game.draw(this.ctx);
    }
  }

  deathScreen() {
    this.ctx.clearRect(this.game.border, this.game.border, this.game.dimX, this.game.dimY);
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(this.game.border, this.game.border, this.game.dimX, this.game.dimY);
    this.dialog(':(', 'press N to try again');
  }

  winScreen() {
    this.ctx.clearRect(this.game.border, this.game.border, this.game.dimX, this.game.dimY);
    this.ctx.fillStyle = 'blue';
    this.ctx.fillRect(this.game.border, this.game.border, this.game.dimX, this.game.dimY);
    this.dialog(':)', 'press N to play again');
  }

  bindKeyHandlers() {
    let snackman = this.game.snackman[0];

    Object.keys(GameView.NEW).forEach((n) => {
      key(n, () => {
        if (this.game.lives < 0) {
          this.timer = 3;
          this.game.newMap();
          this.countdown();
          this.start();
        }
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
      this.dialog(`game starting in ${this.timer}`);
      this.timer -= 1;
      if (this.timer <= 0) clearInterval(id);
    }, 800);
  }

  start() {
    setTimeout( () => {
      this.game.resetLocs();
      clearInterval(this.ticker);
      this.ticker = setInterval( () => {
        this.update();
      }, 160);
    }, 3000);
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
