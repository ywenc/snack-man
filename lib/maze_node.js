class mazeNode {
  constructor(pos, startCoords, sym, spriteHeight){
    this.location = location;
    this.startCoords = startCoords;
    this.spriteHeight = spriteHeight;
    this.sym = sym;
    this.visited = false;
  }

  sideL() {
    return this.spriteHeight * 2 + 2;
  }

  centerPt() {
    const x = this.startCoords[0];
    const y = this.startCoords[1];

    return [
      x + ( 1/2 * this.sideL()),
      y + (1/2 * this.sideL())
    ];
  }

  isPassageway() {
    switch (this.sym) {
      case ".":
      case "O":
        return true;
      case "=":
      case "x":
      case "p":
      case "P":
        return false;
      default:
        return false;
    }
  }

  draw(ctx) {
    const x = this.startCoords[0];
    const y = this.startCoords[1];
    const spriteHeight = this.spriteHeight;

    switch(this.sym) {
      case "=":
      case "x":
      case "p":
      case "P":
        ctx.beginPath();
        ctx.fillStyle = "gray";
        ctx.fillRect(x, y, 2 * spriteHeight + 2, 2 * spriteHeight + 2);
        ctx.clearRect(x + 1, y + 1, 2 * spriteHeight, 2 * spriteHeight);
        ctx.fillStyle = "black";
        ctx.fillRect(x + 1, y + 1, 2 * spriteHeight, 2 * spriteHeight);
        break;
      case ".":
        ctx.beginPath();
        ctx.fillStyle = "white";

        ctx.fillRect(x, y, 2 * spriteHeight + 2, 2 * spriteHeight + 2);
        ctx.fillStyle = "black";
        ctx.arc(x + spriteHeight, y + spriteHeight, 1,
          0, 2 * Math.PI, true);
        ctx.fill();
        break;
      case "O":
      ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.fillRect(x, y, 2 * spriteHeight + 5, 2 * spriteHeight + 5);
        ctx.fillStyle = "gray";
        ctx.arc(x + spriteHeight, y + spriteHeight, 6,
          0, 2 * Math.PI, true);
        ctx.fill();
        break;
      default:
        console.log(':(');
    }
  }
}

export default mazeNode;
