import Ghost from '../ghost';
import g1 from './g1';
import * as Util from '../util';

//another random

class g3 extends Ghost {
  constructor(game) {
    super(game, [10, 10]);
    this.color = '#917591';
    this.pos = this.node([10, 10]).centerPos();
    this.dir = "right";
  }

  leavePen(ctx) {
    setTimeout(() => {
      this.pos = [
        this.node([9, 10]).centerPos()[0],
        this.node([9, 10]).centerPos()[1] + 2
      ];
      this.game.draw(ctx);
      this.location = [9, 10];
    }, 120);
    setTimeout(() => {
      this.pos = [
        this.node([8, 10]).centerPos()[0],
        this.node([8, 10]).centerPos()[1] + 2
      ];
      this.game.draw(ctx);
      this.location = [8, 10];
    }, 360);
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
        let possibleLoc = Util.checkNewLoc(this.location, 'down');
        this.dir = this.node(possibleLoc).ghostPassageway() ? 'down' : 'up';
        break;
      case 'up':
      case 'down':
        possibleLoc = Util.checkNewLoc(this.location, 'right');
        this.dir = this.node(possibleLoc).ghostPassageway() ? 'right' : 'left';
        break;
      default:
        console.log(':C');
    }
  }

  reset() {
    this.location = [10, 10];
    this.pos = this.node([10, 10]).centerPos();
  }
}

export default g3;
