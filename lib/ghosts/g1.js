import Ghost from '../ghost';
import * as Util from '../util';
//stupid ghost

class g1 extends Ghost {
  constructor(game) {
    super(game, [8, 10]);
    this.color = '#f79a7e';
    this.mapNode = this.node(this.location);
    this.pos = this.mapNode.centerPos();
    this.dir = "up";
  }

  leavePen(ctx) {
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
      //or an array that has the possible directions. Math.random() > 0.5 ? array.pop, array.shift
      //set the new direction to array[0]
      //this way, the ghost always goes up and left if it can
      //looks random enough
        let possibleLoc = Util.checkNewLoc(this.location, 'up');
        this.dir = this.node(possibleLoc).ghostPassageway() ? 'up' : 'down';
        break;
      case 'up':
      case 'down':
        possibleLoc = Util.checkNewLoc(this.location, 'left');
        this.dir = this.node(possibleLoc).ghostPassageway() ? 'left' : 'right';
        break;
      default:
        console.log(':C');
    }
  }

  reset() {
    this.location = [8, 10];
    this.pos = this.mapNode.centerPos();
  }
}

export default g1;
