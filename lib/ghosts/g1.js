import Ghost from '../ghost';

//stupid ghost

class g1 extends Ghost {
  constructor(game) {
    super(game, [8, 10]);
    this.color = '#66846c';
    this.pos = this.node([8, 10]).centerPos();
    this.dir = "up";
  }

  move() {
    
  }

  reset() {
    this.location = [8, 10];
    this.pos = this.node([8, 10]).centerPos();
  }
}

export default g1;
