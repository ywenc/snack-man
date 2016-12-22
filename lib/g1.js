import Ghost from './ghost';

//stupid ghost

class g1 extends Ghost {
  constructor(game) {
    super(game);
    this.color = '#e0e8dc';
    this.pos = [210, 300];
  }
}

export default g1;
