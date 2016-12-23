import Ghost from '../ghost';

//bfs ghost

class g2 extends Ghost {
  constructor(game) {
    super(game, [10, 9]);
    this.color = '#5b6887';
    this.pos = this.node([10, 9]).centerPos();
  }

  move() {
    // const offsetX = this.vel[0] * 1000/60;
    // const offsetY = this.vel[1] * 1000/60;
    // this.pos = [this.pos[0] + offsetX, this.pos[1]];
  }

  reset() {
    this.location = [10, 9];
    this.pos = this.node([10, 9]).centerPos();
  }
}

export default g2;
