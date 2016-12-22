import Ghost from './ghost';

//euclidean ghost

class g3 extends Ghost {
  constructor(game) {
    super(game);
    this.color = '#eadcdc';
    this.pos = [250, 300];
  }

  reset() {
    this.pos = [250, 300];
  }
}

export default g3;
