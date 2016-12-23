import Ghost from '../ghost';

//euclidean ghost

class g3 extends Ghost {
  constructor(game) {
    super(game);
    this.color = '#846680';
    this.pos = [
      (game.dimX / 2),
      (game.dimY / 2)
    ];
  }

  move() {
    const offsetX = this.vel[0] * 1000/60;
    const offsetY = this.vel[1] * 1000/60;
    this.pos = [this.pos[0] + offsetX, this.pos[1]];
  }

  reset() {
    this.pos = [250, (game.dimY / 2)];
  }
}

export default g3;
