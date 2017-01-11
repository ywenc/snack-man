import Ghost from '../ghost';
import * as Util from '../util';
import g1 from './g1';

//alex's ghost

class g4 extends Ghost {
  constructor(game) {
    super(game, [10, 11]);
    this.color = '#b3bdce';
    this.pos = this.mazeNodes[10][11].centerPos();
    this.dir = "left";
  }

  move() {
    if (this.location[0] === 10 && this.location[1] === 11) {
      setTimeout(() => {
        this.pos = this.node(this.location).centerPos();
        this.location = [10, 10];
      }, 120);
    } else if (this.location[0] === 10 && this.location[1] === 10) {
      setTimeout(() => {
        this.pos = this.node(this.location).centerPos();
        this.location = [9, 10];
      }, 240);
    } else if (this.location[0] === 9 && this.location[1] === 10) {
      setTimeout(() => {
        this.pos = this.node(this.location).centerPos();
        this.location = [8, 10];
      }, 360);
    } else if (this.location[0] === 8 && this.location[1] === 10) {
      setTimeout(() => {
        this.pos = this.node(this.location).centerPos();
        this.location = [8, 9];
      }, 480);
    } else {
      this.pos = this.node(this.location).centerPos();
      const tube = this.potentialMoves(this.location).length === 2 ? true : false;
      const newLoc = Util.checkNewLoc(this.location, this.dir);

      if (this.node(newLoc).ghostPassageway()) {
        this.pos = this.node(newLoc).centerPos();
        this.location = newLoc;
      } else if (!this.node(newLoc).ghostPassageway()){
        this.changeDir(this.dir);
      } else if (this.node(newLoc).ghostPassageway() && !tube) {
        if (Math.random() > 0.5) this.changeDir(this.dir);
      }
    }
  }

  changeDir(dir) {
    // debugger
    const target = this.snackman.location;
    let newDirs, newDir, possibleLoc, randChange;
    switch(Math.abs(this.location[0] - target[0]) > Math.abs(this.location[1] - target[1])) {
      case true:
        newDirs = (this.dir === 'left' || this.dir === 'right') ? ['up', 'down'] : ['left', 'right'];
        newDir = this.location[1] > target[1] ? newDirs.pop() : newDirs.shift();
        possibleLoc = Util.checkNewLoc(this.location, newDir);
        this.dir = this.node(possibleLoc).ghostPassageway() ? newDir : newDirs[0];
        break;
      case false:
        newDirs = (this.dir === 'up' || this.dir === 'down') ? ['left', 'right'] : ['up', 'down'];
        newDir = this.location[0] > target[0] ? newDirs.pop() : newDirs.shift();
        possibleLoc = Util.checkNewLoc(this.location, newDir);
        this.dir = this.node(possibleLoc).ghostPassageway() ? newDir : newDirs[0];
        break;
      default:
        console.log(':bad');
    }
  }

  reset() {
    this.location = [10, 11];
    this.pos = this.node(this.location).centerPos();
  }
}

export default g4;
