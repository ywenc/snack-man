import Ghost from '../ghost';
import g1 from './g1';
import * as Util from '../util';

//another random

class g3 extends Ghost {
  constructor(game) {
    super(game, [10, 10]);
    this.color = '#917591';
    this.pos = this.node([10, 10]).centerPos();
    this.dir = "right";
  }

  leavePen(ctx) {
    setTimeout(() => {
      this.pos = [
        this.node([9, 10]).centerPos()[0],
        this.node([9, 10]).centerPos()[1] + 2
      ];
      this.game.draw(ctx);
      this.location = [9, 10];
    }, 120);
    setTimeout(() => {
      this.pos = [
        this.node([8, 10]).centerPos()[0],
        this.node([8, 10]).centerPos()[1] + 2
      ];
      this.game.draw(ctx);
      this.location = [8, 10];
    }, 360);
  }

  reset() {
    this.location = [10, 10];
    this.pos = this.node([10, 10]).centerPos();
  }
}

export default g3;
