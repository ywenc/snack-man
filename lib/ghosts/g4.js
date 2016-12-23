import Ghost from '../ghost';

//A* ghost

class g4 extends Ghost {
  constructor(game) {
    super(game, [14, 16]);
    this.color = '#874e4d';
    this.pos = this.mazeNodes[14][16].spriteStart();
  }

  move() {
    const offsetX = this.vel[0] * 1000/60;
    const offsetY = this.vel[1] * 1000/60;
    this.pos = [this.pos[0] + offsetX, this.pos[1]];
  }

  reset() {
    this.pos = this.mazeNodes[14][16].spriteStart();
  }
}

export default g4;
