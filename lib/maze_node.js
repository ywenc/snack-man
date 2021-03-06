class mazeNode {
  constructor(location, pos, sym, spriteHeight){
    this.location = location;
    this.pos = pos;
    this.spriteHeight = spriteHeight;
    this.sym = sym;
    this.visited = false;
    this.children = [];
    this.parent = null;
  }

  toString() {
    return `${this.location[0]}-${this.location[1]}`;
  }

  addChild(child) {
    child.setParent(this);
  }

  removeChild(child) {
    if (child && this.children.indexOf(child) > -1) {
      child.setParent(null);
    }
  }

  setParent(parent) {
    if (this.parent) {
      this.parent.children.splice(this.parent.children.indexOf(this), 1);
    }

    this.parent = parent;

    if (this.parent) {
      this.parent.children.push(this);
    }

    return this;
  }

  bfs(target) {
    const currNode = this;
    let nodes = [currNode];

    while (nodes.length > 0) {
      let node = nodes.shift();
      if (node.toString() === target.toString()) {
        return nodes;
      }

      nodes = nodes.concat(node.children);
    }

    return null;
  }

  sideL() {
    return this.spriteHeight * 2 + 2;
  }

  centerPos() {
    const x = this.pos[0];
    const y = this.pos[1];

    return [
      x + (1/2 * this.sideL()),
      y + (1/2 * this.sideL())
    ];
  }

  ghostPassageway() {
    switch (this.sym) {
      case ".":
      case "O":
        return true;
      case "Q":
      case "p":
      case "=":
      case "x":
      case "P":
        return false;
      default:
        return false;
    }
  }

  ghostDoor() {
    switch (this.sym) {
      case "p":
        return true;
      default:
        return false;
    }
  }

  snackmanPassageway() {
    switch (this.sym) {
      case ".":
      case "O":
        return true;
      case "=":
      case "x":
      case "Q":
      case "p":
      case "P":
        return false;
      default:
        return false;
    }
  }

  draw(ctx) {
    const x = this.pos[0];
    const y = this.pos[1];
    const sqHeight = this.spriteHeight * 2;
    const spriteHeight = this.spriteHeight;

    switch(this.sym) {
      case "x":
        ctx.beginPath();
        ctx.fillStyle = "#1a1a1a";
        ctx.fillRect(x + 1, y + 1, sqHeight + 2, sqHeight + 2);
        break;
      case "Q":
        ctx.beginPath();
        ctx.fillStyle = "#1a1a1a";
        ctx.fillRect(x, y, sqHeight + 2, sqHeight + 2);
        break;
      case "p":
        ctx.beginPath();
        let gradDoor = ctx.createLinearGradient(0, y, 0, y + sqHeight);
        gradDoor.addColorStop(0.3, "#1a1a1a");
        gradDoor.addColorStop(1, "pink");
        ctx.fillStyle = gradDoor;
        ctx.fillRect(x, y, sqHeight + 2, sqHeight + 2);
        break;
      case "P":
        ctx.beginPath();
        ctx.fillStyle = "blue";
        ctx.fillRect(x, y, sqHeight + 2, sqHeight + 2);
        ctx.clearRect(x + 1, y + 1, sqHeight, sqHeight);
        ctx.fillStyle = "black";
        ctx.fillRect(x, y + 1, sqHeight, sqHeight);
        break;
      case "=":
        ctx.beginPath();
        ctx.fillStyle = "blue";
        ctx.fillRect(x, y, sqHeight + 2, sqHeight + 2);
        ctx.clearRect(x + 1, y + 1, sqHeight, sqHeight);
        ctx.fillStyle = "black";
        ctx.fillRect(x + 1, y + 1, sqHeight, sqHeight);
        break;
      case "B":
        ctx.beginPath();
        ctx.fillStyle = "blue";
        ctx.fillRect(x, y, sqHeight + 2, sqHeight + 2);
        ctx.clearRect(x + 1, y + 1, sqHeight, sqHeight);
        ctx.fillStyle = "#1a1a1a";
        ctx.fillRect(x + 1, y + 1, sqHeight, sqHeight);
        break;
      case ".":
        ctx.beginPath();
        ctx.fillStyle = "#1a1a1a";
        ctx.fillRect(x, y, sqHeight + 2, sqHeight + 2);

        if (!this.visited) {
          ctx.fillStyle = "white";
          ctx.fillRect(x + 12, y + 12, 2, 2);
          ctx.fill();
        }
        break;
      case "O":
      ctx.beginPath();
        ctx.fillStyle = "#1a1a1a";
        ctx.fillRect(x, y, sqHeight + 5, sqHeight + 5);

        if (!this.visited) {
          ctx.fillStyle = "white";
          ctx.arc(x + spriteHeight, this.centerPos()[1], 4,
            0, 2 * Math.PI, true);
          ctx.fill();
        }
        break;
      default:
        console.log(':(');
    }
  }
}

export default mazeNode;
