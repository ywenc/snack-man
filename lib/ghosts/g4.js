import Ghost from '../ghost';
import * as Util from '../util';
import g1 from './g1';

//A* ghost

class g4 extends Ghost {
  constructor(game) {
    super(game, [10, 11]);
    this.color = '#874e4d';
    this.pos = this.mazeNodes[10][11].centerPos();
  }

  // move() {
    // const offsetX = this.vel[0] * 1000/60;
    // const offsetY = this.vel[1] * 1000/60;
    // this.pos = [this.pos[0] + offsetX, this.pos[1]];
  // }

  reset() {
    this.location = [10, 11];
    this.pos = this.node([10, 11]).centerPos();  }
}

export default g4;
