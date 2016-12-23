export const checkNewLoc = (location, direction) => {
  const [row, col] = location;
  let newLoc;

  switch(direction) {
    case "right":
     newLoc = [row, (col + 1) % 21];
      break;
    case "left":
      if (col - 1 < 0) {
        newLoc = [row, 20];
      } else {
        newLoc = [row, (col - 1)];
      }
      break;
    case "up":
      newLoc = [row - 1, col];
      break;
    case "down":
      newLoc = [row + 1, col];
      break;
    default:
      console.log(':(');
  }

  return newLoc;
};

export const nearbySqs = (location) => {
  const row = location[0];
  const col = location[1];

  const maxRowIdx = this.mazs[0].length - 1;

  return [
    [row + 1, col],
    [row, (col + 1) % 21],
    [row - 1, col],
    [row, (col - 1) % 21]
  ];
};
