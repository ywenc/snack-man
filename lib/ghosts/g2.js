import Ghost from '../ghost';

//bfs ghost

class g2 extends Ghost {
  constructor(game) {
    super(game);
    this.color = '#5b6887';
    this.pos = [
      (game.dimX / 2) - (2.5 * this.radius),
      (game.dimY / 2)
    ];
  }

  move() {
    const offsetX = this.vel[0] * 1000/60;
    const offsetY = this.vel[1] * 1000/60;
    this.pos = [this.pos[0] + offsetX, this.pos[1]];
  }

  reset() {
    this.pos = [225, (game.dimY / 2)];
  }
}

export default g2;
