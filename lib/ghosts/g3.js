import Ghost from '../ghost';

//euclidean ghost

class g3 extends Ghost {
  constructor(game) {
    super(game, [10, 10]);
    this.color = '#846680';
    this.pos = this.node([10, 10]).centerPos();
  }

  move() {
    const offsetX = this.vel[0] * 1000/60;
    const offsetY = this.vel[1] * 1000/60;
    this.pos = [this.pos[0] + offsetX, this.pos[1]];
  }

  reset() {
    this.location = [10, 10];
    this.pos = this.node([10, 10]).centerPos();
  }
}

export default g3;
