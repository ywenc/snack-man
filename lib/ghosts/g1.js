import Ghost from '../ghost';
import * as Util from '../util';
//stupid ghost

class g1 extends Ghost {
  constructor(game) {
    super(game, [8, 10]);
    this.color = this.weak ? 'blue' : '#f79a7e';
    this.strColor = '#f79a7e';
    this.pos = this.node([8, 10]).centerPos();
    this.dir = "up";
  }

  reset() {
    this.pos = this.node([8, 10]).centerPos();
  }

  resetLoc() {
    this.location = [8, 10];
  }
}

export default g1;
