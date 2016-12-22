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

    if (this.pos[1] === 300) {
      this.isWrappable = true;
    } else {
      this.isWrappable = false;
    }

    if (this.game.isOutOfBounds) {
      if (this.isWrappable) {
        if (this.pos[0] < 60) {
          this.pos[0] = 430 - this.pos[0];
        } else if (this.pos[0] > 450) {
          this.pos[0] = 60 + (this.pos[0] % 450);
        }
      } else {
        this.vel = [0, 0];
      }
    } else {
      this.vel = [10, 10];
    }
  }

  touch() {

  }

  isTouched() {

  }
}

export default MovingObject;
