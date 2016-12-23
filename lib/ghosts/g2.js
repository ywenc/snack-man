import Ghost from '../ghost';

//bfs ghost

class g2 extends Ghost {
  constructor(game) {
    super(game, [14, 12]);
    this.color = '#5b6887';
    this.pos = this.mazeNodes[14][12].spriteStart();
  }

  move() {
    const offsetX = this.vel[0] * 1000/60;
    const offsetY = this.vel[1] * 1000/60;
    this.pos = [this.pos[0] + offsetX, this.pos[1]];
  }

  reset() {
    this.pos = this.mazeNodes[14][12].spriteStart();
  }
}

export default g2;
