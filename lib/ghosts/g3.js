import Ghost from '../ghost';
import g1 from './g1';

//euclidean ghost

class g3 extends Ghost {
  constructor(game) {
    super(game, [10, 10]);
    this.color = '#846680';
    this.pos = this.node([10, 10]).centerPos();
  }

  // move() {
  //
  // }

  reset() {
    this.location = [10, 10];
    this.pos = this.node([10, 10]).centerPos();
  }
}

export default g3;
