import Player from './Player.mjs';
import Collectible from './Collectible.mjs';
import controls from './controls.mjs';
import { generateStartPos, canvasCalcs } from './canvas-data.mjs';

const socket = io();
const canvas = document.getElementById('game-window');
const context = canvas.getContext('2d', { alpha: false });

// Preload game assets
const loadImage = src => {
  const img = new Image();
  img.src = src;
  return img;
}

const bronzeCoin = loadImage('./assets/bronze-coin.png');
const silverCoin = loadImage('./assets/silver-coin.png');
const goldCoin = loadImage('./assets/gold-coin.png');
const mainPlayer = loadImage('./assets/main-player.png');
const otherPlayer = loadImage('./assets/other-player.png');

let tick;
let currPlayers = [];
let item;
let endGame;

socket.on('init', ({ id, players, coin }) => {
  console.log(`Connected ${id}`);

  // Cancel animation if one already exists and
  // the page isn't refreshed, like if the server
  // restarts
  cancelAnimationFrame(tick);

  // Create our player when we log on
  const mainPlayer = new Player({ 
    x: generateStartPos(canvasCalcs.playFieldMinX, canvasCalcs.playFieldMaxX, 5),
    y: generateStartPos(canvasCalcs.playFieldMinY, canvasCalcs.playFieldMaxY, 5),
    id, 
    main: true 
  });

  controls(mainPlayer, socket);

  // Send our player back to the server
  socket.emit('new-player', mainPlayer);

  // Add new player when someone logs on
  socket.on('new-player', obj => currPlayers.push(new Player(obj)));

  // Handle movement
  socket.on('move-player', ({ id, dir, posObj }) => {
    const movingPlayer = currPlayers.find(obj => obj.id === id);
    movingPlayer.moveDir(dir);
    
    // Force sync in case of lag
    movingPlayer.x = posObj.x;
    movingPlayer.y = posObj.y;
  });

  socket.on('stop-player', ({ id, dir, posObj }) => {
    const stoppingPlayer = currPlayers.find(obj => obj.id === id);
    stoppingPlayer.stopDir(dir);

    // Force sync in case of lag
    stoppingPlayer.x = posObj.x;
    stoppingPlayer.y = posObj.y;
  });

  // Handle new coin gen
  socket.on('new-coin', newCoin => {
    item = new Collectible(newCoin);
  });

  // Handle player disconnection
  socket.on('remove-player', id => {
    console.log(`${id} disconnected`);
    currPlayers = currPlayers.filter(player => player.id !== id);
  });

  // Handle endGame state
  socket.on('end-game', result => endGame = result);

  // Update mainPlayer's score
  socket.on('update-player', obj => (mainPlayer.score = obj.score));

  // Populate list of connected players and 
  // create current coin when logging in
  currPlayers = players.map(value => new Player(value)).concat(mainPlayer);
  item = new Collectible(coin);

  draw();
});

const draw = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Set background color
  context.fillStyle = '#220';
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Create border for play field
  context.strokeStyle = 'white';
  context.strokeRect(canvasCalcs.playFieldMinX, canvasCalcs.playFieldMinY, canvasCalcs.playFieldWidth, canvasCalcs.playFieldHeight);

  // Controls text
  context.fillStyle = 'white';
  context.font = `13px 'Press Start 2P'`;
  context.textAlign = 'center';
  context.fillText('Controls: WASD', 100, 32.5);

  // Game title
  context.font = `16px 'Press Start 2P'`;
  context.fillText('Coin Race', canvasCalcs.canvasWidth / 2, 32.5);

  // Draw players
  currPlayers.forEach(player => player.draw(context, item, { mainPlayer, otherPlayer }));

  // Draw current coin
  item.draw(context, { bronzeCoin, silverCoin, goldCoin });

  // Remove destroyed coin
  if (item.destroyed) {
    socket.emit('destroy-item', { playerId: item.destroyed, coinValue: item.value, coinId: item.id });
  }

  if (endGame) {
    context.fillStyle = 'white';
    context.font = `13px 'Press Start 2P'`
    context.fillText(`You ${endGame}! Restart and try again.`, canvasCalcs.canvasWidth / 2, 80);
  }

  if (!endGame) tick = requestAnimationFrame(draw);
}

/*
  Note: Attempt to export this for testing
  but hide errors in the client
*/
try {
  module.exports = {
    currPlayers
  }
} catch(e) {}
