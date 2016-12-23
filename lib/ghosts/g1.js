import Ghost from '../ghost';

//stupid ghost

class g1 extends Ghost {
  constructor(game) {
    super(game, [11, 14]);
    this.color = '#66846c';
    this.pos = this.node([12, 14]).spriteStart();
    this.dir = "up";
  }

  move() {
    const randIdx = Math.floor(Math.random() * this.potentialMoves().length);
    const randMove = this.potentialMoves()[randIdx];
    this.location = randMove;
    this.pos = this.node(randMove).centerPos();
  }

  reset() {
    this.location = [12, 14];
    this.pos = this.node([12, 14]).spriteStart();
  }
}

export default g1;
