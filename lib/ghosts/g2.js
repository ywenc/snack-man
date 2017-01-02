import Ghost from '../ghost';
import * as Util from '../util';
import g1 from './g1';
//bfs ghost

class g2 extends Ghost {
  constructor(game) {
    super(game, [10, 9]);
    this.color = '#5b6887';
    this.pos = this.node([10, 9]).centerPos();
    this.visitedPostions = this.pos;
    this.dir = 'up';
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
  //
  // buildMoveTree() {
  //   const rootNode = this.node(this.location);
  //   let nodes = [rootNode];
  //   let currNode;
  //   let currLoc;
  //
  //   if (nodes.length) {
  //     currNode = nodes.shift();
  //     currLoc = currNode.location;
  //     const newMoves = this.potentialMoves(this.location);
  //     newMoves.forEach((newMove) => {
  //       const newNode = this.node(newMove);
  //       currNode.add_child(newNode);
  //       nodes.push(newNode);
  //     });
  //   }
  // }
  //
  // findPath(snackman) {
  //
  // }
  //
  // tracePathBack() {
  //
  // }

  reset() {
    this.location = [10, 9];
    this.pos = this.node([10, 9]).centerPos();
  }
}

export default g2;
