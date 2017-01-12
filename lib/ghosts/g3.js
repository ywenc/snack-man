import Ghost from '../ghost';
import g1 from './g1';
import * as Util from '../util';

//another random

class g3 extends Ghost {
  constructor(game) {
    super(game, [10, 10]);
    this.color = this.weak ? 'blue' : '#917591';
    this.pos = this.node([10, 10]).centerPos();
    this.dir = "right";
  }

  reset() {
    this.pos = this.node([10, 10]).centerPos();
  }

  resetLoc() {
    this.location = [10, 10];
  }
}

export default g3;
