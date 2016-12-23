import Ghost from '../ghost';

//stupid ghost

class g1 extends Ghost {
  constructor(game) {
    super(game);
    this.color = '#66846c';
    this.pos = [
      (game.dimX / 2),
      ((game.dimY / 2) - (this.radius * 2.5))
    ];
  }

  move() {
    const offsetX = this.vel[0] * 1000/60;
    const offsetY = this.vel[1] * 1000/60;
    this.pos = [this.pos[0] + offsetX, this.pos[1]];
  }

  reset() {
    this.pos = [(game.dimX / 2),
    ((game.dimY / 2) - (this.radius * 2.5))];
  }
}

export default g1;
