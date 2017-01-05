import Ghost from '../ghost';
import * as Util from '../util';
import g1 from './g1';

//A* ghost

class g4 extends Ghost {
  constructor(game) {
    super(game, [10, 11]);
    this.color = '#b3bdce';
    this.pos = this.mazeNodes[10][11].centerPos();
    this.dir = "left";
  }

  leavePen(ctx) {
    setTimeout(() => {
      this.pos = this.node([10, 11]).centerPos();
      this.game.draw(ctx);
    }, 120);
    setTimeout(() => {
      this.pos = [
        this.node([10, 11]).centerPos()[0],
        this.node([10, 11]).centerPos()[1] + 2
      ];
      this.game.draw(ctx);
    }, 240);
    setTimeout(() => {
      this.pos = this.node([10, 10]).centerPos();
      this.game.draw(ctx);
    }, 360);
    setTimeout(() => {
      this.pos = [
        this.node([10, 10]).centerPos()[0],
        this.node([10, 10]).centerPos()[1] + 2
      ];
      this.game.draw(ctx);
    }, 480);
    setTimeout(() => {
      this.pos = this.node([9, 10]).centerPos();
      this.game.draw(ctx);
    }, 600);
    setTimeout(() => {
      this.pos = [
        this.node([9, 10]).centerPos()[0],
        this.node([9, 10]).centerPos()[1] + 2
      ];
      this.game.draw(ctx);
    }, 720);
    setTimeout(() => {
      this.pos = this.node([8, 10]).centerPos();
      this.game.draw(ctx);
      this.location = [8, 10];
    }, 1080);
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
  //
  // move() {
  //   const newLoc = Util.checkNewLoc(this.location, this.dir);
  //   if (this.node(newLoc).ghostPassageway()) {
  //     this.pos = this.node(newLoc).centerPos();
  //     this.location = newLoc;
  //   } else {
  //     this.changeDir(this.dir);
  //   }
  // }
  //
  // changeDir(dir) {
  //   let newDirs;
  //   switch(dir) {
  //     case 'left':
  //     case 'right':
  //       newDirs = ['up', 'down'];
  //       break;
  //     case 'up':
  //     case 'down':
  //       newDirs = ['left', 'right'];
  //       break;
  //     default:
  //       console.log(':C');
  //   }
  //
  //   this.dir = newDirs[Math.floor(Math.random() * 2)];
  // }

  reset() {
    this.location = [10, 11];
    this.pos = this.node(this.location).centerPos();
  }
}

export default g4;
