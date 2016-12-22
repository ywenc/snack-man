import Game from './game';

class MovingObject {
  constructor(game) {
    this.vel = [1, 1];
    this.game = game;
    this.isWrappable = false;
  }

  wrap() {
    if (this.pos[1] === 300) {
      this.isWrappable = true;
    } else {
      this.isWrappable = false;
    }
    //
    // if (this.game.isOutOfBounds(this.pos)) {
    //   if (this.isWrappable) {
    //     if (this.pos[0] < 60) {
    //       this.pos[0] = 450 - this.pos[0] - 20;
    //     } else if (this.pos[0] > 430) {
    //       this.pos[0] = 70 + ((this.pos[0] + 10) % 450);
    //     }
    //   } else {
    //     if (this.pos[0] < 70) {
    //       this.vel = [0, 1];
    //     } else if (this.pos[0] > 450) {
    //       this.vel = [0, 1];
    //     } else if (this.pos[1] < 60) {
    //       this.vel = [1, 0];
    //     } else if (this.pos[1] > 510) {
    //       this.vel = [1, 0];
    //     }
    //   }
    // }

    if (this.isWrappable) {
      if (this.pos[0] < 60) {
        this.pos[0] = 450 - this.pos[0] - 20;
      } else if (this.pos[0] > 440) {
        this.pos[0] = 70 + ((this.pos[0] + 10) % 450);
      }
    } else {

      if (this.pos[0] < 70 || this.pos[0] > 430) {
        this.vel = [0, 1];
      } else if ((this.pos[1] < 70 || this.pos[1] > 530)) {
        this.vel = [1, 0];
      }
    }
  }

  isTouching(obj) {
    return (
      (Math.abs(this.pos[0] - obj.pos[0]) <= (this.radius + obj.radius) &&
      (this.pos[1] === obj.pos[1])) ||
      (Math.abs(this.pos[1] - obj.pos[1]) <= (this.radius + obj.radius) &&
      (this.pos[0] === obj.pos[0]))
    );
  }
}

export default MovingObject;
