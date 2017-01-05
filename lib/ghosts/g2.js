import Ghost from '../ghost';
import * as Util from '../util';
import g1 from './g1';

//bfs ghost

class g2 extends Ghost {
  constructor(game) {
    super(game, [10, 9]);
    this.color = '#7a9175';
    this.pos = this.node([10, 9]).centerPos();
    this.visitedPostions = [this.mapNode];
    this.dir = 'right';
  }

  leavePen(ctx) {
    setTimeout(() => {
      // this.pos = this.node([10,9]).centerPos();
      this.game.draw(ctx);
    }, 240);
    setTimeout(() => {
      this.pos = [
        this.node([10, 9]).centerPos()[0],
        this.node([10, 9]).centerPos()[1] + 2
      ];
      this.game.draw(ctx);
    }, 360);
    setTimeout(() => {
      this.pos = this.node([10, 10]).centerPos();
      this.game.draw(ctx);
    }, 480);
    setTimeout(() => {
      this.pos = [
        this.node([10, 10]).centerPos()[0],
        this.node([10, 10]).centerPos()[1] + 2
      ];
      this.game.draw(ctx);
    }, 600);
    setTimeout(() => {
      this.pos = this.node([9, 10]).centerPos();
      this.game.draw(ctx);
    }, 720);
    setTimeout(() => {
      this.pos = [
        this.node([9, 10]).centerPos()[0],
        this.node([9, 10]).centerPos()[1] + 2
      ];
      this.game.draw(ctx);
    }, 840);
    setTimeout(() => {
      this.pos = this.node([8, 10]).centerPos();
      this.game.draw(ctx);
      this.location = [8, 10];
    }, 960);
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

  // move() {
  //   const newLoc = Util.checkNewLoc(this.location, this.dir);
  //   if (this.node(newLoc).ghostPassageway()) {
  //     this.pos = this.node(newLoc).centerPos();
  //     this.location = newLoc;
  //   } else {
  //     this.changeDir(this.dir);
  //   }
  // }

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

  // move() {
  //   const newLoc = Util.checkNewLoc(this.location, this.dir);
  //   if (this.node(newLoc).ghostPassageway()) {
  //     this.pos = this.node(newLoc).centerPos();
  //     this.location = newLoc;
  //   } else {
  //     this.buildMoveTree();
  //     this.findDir();
  //   }
  // }
  //
  // findDir() {
  //   const nodeLoc = this.findSnackman().location;
  //   const x = nodeLoc[0];
  //   const y = nodeLoc[1];
  //
  //   switch (nodeLoc) {
  //     case x < this.location[0]:
  //       this.dir = 'left';
  //       break;
  //     case x > this.location[0]:
  //       this.dir = 'right';
  //       break;
  //     case y < this.location[1]:
  //       this.dir = 'up';
  //       break;
  //     case y > this.location[1]:
  //       this.dir = 'down';
  //       break;
  //     default:
  //       console.log(":C");
  //   }
  // }
  //
  // buildMoveTree() {
  //   const rootNode = this.mapNode;
  //   let nodes = [rootNode];
  //   let currNode;
  //   let newNode;
  //
  //   while (nodes.length !== 0) {
  //     currNode = nodes.shift();
  //     const newMoves = this.potentialMoves(this.location).filter((sq) =>
  //       this.visitedPostions.indexOf(sq) === -1);
  //
  //     this.visitedPostions = this.visitedPostions.concat(newMoves);
  //     newMoves.forEach((newMove) => {
  //       currNode.addChild(newMove);
  //       nodes.push(newMove);
  //     });
  //   }
  // }
  //
  // findSnackman() {
  //   const target = this.node(this.snackman.location);
  //   const endNode = this.mapNode.bfs(target);
  //   const nodes = [];
  //
  //   let currentNode = endNode;
  //   while (currentNode) {
  //     nodes.push(currentNode);
  //     currentNode = currentNode.parent;
  //   }
  //
  //   return nodes[(nodes.length) - 1];
  // }

  reset(ctx) {
    this.location = [10, 9];
    this.pos = this.mapNode.centerPos();
  }
}

export default g2;
