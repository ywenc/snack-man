import MovingObject from './moving_object';

class Ghost extends MovingObject {
  constructor(game) {
    super(game);
    this.pos = [250, 300];
    this.radius = 10;
  }

  draw(ctx) {
    const x = this.pos[0];
    const y = this.pos[1];
    const r = this.radius;

    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(x, y, r,
      0, Math.PI, true);
    ctx.lineTo(x - r, y + r);
    ctx.lineTo(x - (2/3 * r), y + (2/3 * r));
    ctx.lineTo(x - (1/3 * r), y + r);
    ctx.lineTo(x, y + (2/3 * r));
    ctx.lineTo(x + (1/3 * r), y + r);
    ctx.lineTo(x + (2/3 * r), y + (2/3 * r));
    ctx.lineTo(x + r, y + r);
    ctx.fill();

    ctx.fillStyle = "white";

    ctx.beginPath();
    ctx.arc(x - 7, y - 2, 2.1, 2 * Math.PI,
      0, true);
    ctx.arc(x + 5, y - 2, 2.1,
      0, 2 * Math.PI, true);
    ctx.fill();
  }
}

export default Ghost;

//
// class ghost1 extends Ghost {
//   constructor() {
//     super();
//     this.pos = [230, 300];
//   }
//
// }
//
// class ghost2 extends Ghost {
//   constructor() {
//     super();
//     this.pos = [250, 300];
//   }
//
//
// }
//
// class ghost3 extends Ghost {
//   constructor() {
//     super();
//     this.pos = [270, 300];
//   }
//
//
// }