import Player from './Player.mjs';
import Coin from './Coin.mjs';
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

const bronzeCoin = loadImage('./public/assets/bronze-coin.png');
const silverCoin = loadImage('./public/assets/silver-coin.png');
const goldCoin = loadImage('./public/assets/gold-coin.png');
const mainPlayer = loadImage('./public/assets/main-player.png');
const otherPlayer = loadImage('./public/assets/other-player.png');

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
  const player = new Player({ 
    x: generateStartPos(canvasCalcs.playFieldMinX, canvasCalcs.playFieldMaxX, 5),
    y: generateStartPos(canvasCalcs.playFieldMinY, canvasCalcs.playFieldMaxY, 5),
    id, 
    main: true 
  });

  controls(player, socket);

  // Send our player back to the server
  socket.emit('new-player', player);

  // Add new player when someone logs on
  socket.on('new-player', obj => currPlayers.push(new Player(obj)));

  // Handle movement
  socket.on('move-player', ({ id, dir }) =>
    currPlayers.find(obj => obj.id === id).move(dir)
  );

  socket.on('stop-player', ({ id, dir }) =>
    currPlayers.find(obj => obj.id === id).stop(dir)
  );

  // Handle new coin gen
  socket.on('new-coin', newCoin => {
    item = new Coin(newCoin);
  });

  // Handle player disconnection
  socket.on('remove-player', id => {
    console.log(`${id} disconnected`);
    currPlayers = currPlayers.filter(player => player.id !== id);
  });

  // Handle endGame state
  socket.on('end-game', result => endGame = result);

  socket.on('update-player', obj => (player.score = obj.score));

  // Populate players list and create
  // current coin when logging in
  currPlayers = players.map(val => new Player(val)).concat(player);
  item = new Coin(coin);

  draw();
});

const draw = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);

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
    socket.emit('destroy-item', { playerId: item.destroyed, coinVal: item.val });
  }

  if (endGame) {
    context.fillStyle = 'white';
    context.font = `13px 'Press Start 2P'`
    context.fillText(`You ${endGame}! Restart and try again.`, canvasCalcs.canvasWidth / 2, 80);
  }

  if (!endGame) tick = requestAnimationFrame(draw);
}
