import Game from './game';

class MovingObject {
  constructor(game) {
    this.color = '#000000';
    this.vel = [1, 1];
    this.game = game;
    this.isWrappable = false;
  }

  move() {
    const offsetX = this.vel[0] * 1000/60;
    const offsetY = this.vel[1] * 1000/60;
    this.pos = [this.pos[0] + offsetX, this.pos[1]];
    this.wrap();
  }

  wrap() {
    if (this.pos[1] === 300) {
      this.isWrappable = true;
    } else {
      this.isWrappable = false;
    }

    if (this.game.isOutOfBounds(this.pos)) {
      if (this.isWrappable) {
        if (this.pos[0] < 60) {
          this.pos[0] = 430 - this.pos[0];
        } else if (this.pos[0] > 440) {
          this.pos[0] = 60 + ((this.pos[0] + 10) % 450);
        }
      } else {
        this.vel = [0, 0];
      }
    }
  }

  touch() {

  }

  isTouched() {

  }
}

export default MovingObject;
