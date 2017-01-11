import Ghost from '../ghost';
import * as Util from '../util';
//stupid ghost

class g1 extends Ghost {
  constructor(game) {
    super(game, [8, 10]);
    this.color = '#f79a7e';
    this.mapNode = this.node(this.location);
    this.pos = this.mapNode.centerPos();
    this.dir = "up";
  }

  reset() {
    this.location = [8, 10];
    this.pos = this.mapNode.centerPos();
  }
}

export default g1;
