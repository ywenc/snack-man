import Ghost from '../ghost';
import * as Util from '../util';
import g1 from './g1';

//bfs ghost

class g2 extends Ghost {
  constructor(game) {
    super(game, [10, 9]);
    this.color = '#7a9175';
    this.pos = this.node(this.location).centerPos();
    this.visitedPostions = [this.location];
    this.dir = 'up';

    this.buildMoveTree();
  }

  move() {
    const newLoc = Util.checkNewLoc(this.location, this.dir);
    if (this.node(newLoc).ghostPassageway()) {
      this.pos = this.node(newLoc).centerPos();
      this.location = newLoc;
    } else {
      this.findDir();
    }
  }

  findDir() {
    const nodeLoc = this.findSnackman().location;
    const x = nodeLoc[0];
    const y = nodeLoc[1];

    switch (nodeLoc) {
      case x < this.location[0]:
        this.dir = 'left';
        break;
      case x > this.location[0]:
        this.dir = 'right';
        break;
      case y < this.location[1]:
        this.dir = 'up';
        break;
      case y > this.location[1]:
        this.dir = 'down';
        break;
      default:
        console.log(":C");
    }
  }

  buildMoveTree() {
    const rootNode = this.node(this.location);
    let nodes = [rootNode];
    let currNode;
    let currLoc;
    let newNode;

    while (nodes.length !== 0) {
      currNode = nodes.shift();
      currLoc = currNode.location;
      const newMoves = this.potentialMoves(this.location).filter((el) =>
        this.visitedPostions.indexOf(el) === -1);

      this.visitedPostions = this.visitedPostions.concat(newMoves);
      debugger
      newMoves.forEach((newMove) => {
        newNode = this.node(newMove);
        currNode.addChild(newNode);
        nodes.push(newNode);
      });
    }
  }

  findSnackman() {
    const target = this.node(this.snackman.location);
    const endNode = this.node(this.location).bfs(target);
    const nodes = [];

    let currentNode = endNode;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.parent;
    }

    return nodes[(nodes.length) - 1];
  }

  reset() {
    this.location = [10, 9];
    this.pos = this.node([10, 9]).centerPos();
  }
}

export default g2;
