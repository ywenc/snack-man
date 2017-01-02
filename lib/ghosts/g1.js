import Ghost from '../ghost';
import * as Util from '../util';
//stupid ghost

class g1 extends Ghost {
  constructor(game) {
    super(game, [8, 10]);
    this.color = '#f79a7e';
    this.pos = this.node([8, 10]).centerPos();
    this.dir = "up";
  }

  move() {
    const newLoc = Util.checkNewLoc(this.location, this.dir);
    if (this.node(newLoc).ghostPassageway()) {
      this.pos = this.node(newLoc).centerPos();
      this.location = newLoc;
    } else {
      this.changeDir(this.dir);
    }
  }

  changeDir(dir) {
    let newDirs;

    switch(dir) {
      case 'left':
      case 'right':
        newDirs = ['up', 'down'];
        break;
      case 'up':
      case 'down':
        newDirs = ['left', 'right'];
        break;
      default:
        console.log(':C');
    }

    this.dir = newDirs[Math.floor(Math.random() * 2)];
  }

  reset() {
    this.location = [8, 10];
    this.pos = this.node([8, 10]).centerPos();
  }
}

export default g1;
