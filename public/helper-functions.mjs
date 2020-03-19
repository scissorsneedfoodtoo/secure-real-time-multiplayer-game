import { canvasCalcs } from './canvas-data.mjs';

const movePlayer = (key, speed, posObj) => {
  let { x, y } = posObj;
  
  if (key === 'D') x + speed <= canvasCalcs.playFieldMaxX ? x += speed : x += 0;
  if (key === 'A') x - speed >= canvasCalcs.playFieldMinX ? x -= speed : x -= 0;
  if (key === 'W') y - speed >= canvasCalcs.playFieldMinY ? y -= speed : y -= 0;
  if (key === 'S') y + speed <= canvasCalcs.playFieldMaxY ? y += speed : y += 0;

  return { x, y }
}



// /* 
//   Export your functions for testing in Node.
//   Note: The `try` block is to prevent errors on
//   the client side
// */
// try {
//   module.exports = {
//     movePlayer
//   }
// } catch (e) {}

export {
  movePlayer
}
