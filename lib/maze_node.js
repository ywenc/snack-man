class mazeNode {
  constructor(location, pos, sym, spriteHeight){
    this.location = location;
    this.pos = pos;
    this.spriteHeight = spriteHeight;
    this.sym = sym;
    this.visited = false;
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
      case "Q":
      case "p":
        return true;
      case "=":
      case "x":
      case "P":
        return false;
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
        ctx.fillStyle = "black";
        ctx.fillRect(x, y, sqHeight + 2, sqHeight + 2);
        break;
      case "Q":
        ctx.beginPath();
        ctx.fillStyle = "#1a1a1a";
        ctx.fillRect(x, y, sqHeight + 2, sqHeight + 2);
        break;
      case "p":
        ctx.beginPath();
        let gradDoor = ctx.createLinearGradient(0, y, 0, y + sqHeight);
        gradDoor.addColorStop(0, "white");
        gradDoor.addColorStop(1, "pink");
        ctx.fillStyle = gradDoor;
        ctx.fillRect(x, y, sqHeight + 2, sqHeight + 2);
        break;
      case "P":
        ctx.beginPath();
        ctx.fillStyle = "#333333";
        ctx.fillRect(x, y, sqHeight + 2, sqHeight + 2);
        ctx.clearRect(x + 1, y + 1, sqHeight, sqHeight);
        ctx.fillStyle = "black";
        ctx.fillRect(x, y + 1, sqHeight, sqHeight);
        break;
      case "=":
        ctx.beginPath();
        ctx.fillStyle = "#1a1a1a";
        ctx.fillStyle = "#1a1a1a";
        ctx.fillRect(x, y, sqHeight + 2, sqHeight + 2);
        ctx.clearRect(x + 1, y + 1, sqHeight, sqHeight);
        ctx.fillStyle = "black";
        ctx.fillRect(x + 1, y + 1, sqHeight, sqHeight);
        break;
      case ".":
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.fillRect(x, y, sqHeight + 2, sqHeight + 2);

        if (!this.visited) {
          ctx.fillStyle = "gray";
          ctx.fillRect(x + 12, y + 12, 2, 2);
          ctx.fill();
        }
        break;
      case "O":
      ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.fillRect(x, y, sqHeight + 5, sqHeight + 5);
        ctx.fillStyle = "#cccccc";
        ctx.arc(x + spriteHeight, this.centerPos()[1], 7,
          0, 2 * Math.PI, true);
        ctx.fill();
        break;
      default:
        console.log(':(');
    }
  }
}

export default mazeNode;
