export const move = (location, direction) => {
  const [row, col] = location;
  let newLoc;

  switch(direction) {
    case "right":
     newLoc = [row, col + 1];
      break;
    case "left":
      newLoc = [row, col - 1];
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
