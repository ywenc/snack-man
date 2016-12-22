import Ghost from './ghost';

//bfs ghost

class g2 extends Ghost {
  constructor(game) {
    super(game);
    this.color = '#e5dce8';
    this.pos = [225, 300];
  }

  reset() {
    this.pos = [225, 300];
  }
}

export default g2;
