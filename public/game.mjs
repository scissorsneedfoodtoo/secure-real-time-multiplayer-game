import Player from './Player.mjs';
import Coin from './Coin.mjs';
import controls from './controls.mjs';
import { generateStartPos, canvasCalcs } from './canvas-data.mjs';

const socket = io();
const canvas = document.getElementById('game-window');
const context = canvas.getContext('2d');

let currPlayers = [];
let item;
let endGame;

socket.on('init', ({ id, players, coin }) => {
  console.log('connected', id);

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

  // // Handle other players collecting coins (not necessary with single random coin)
  // socket.on('destroy-item', id => { 
    // console.log('client destroyed 2', id)
    // items = items.filter(item => item.id !== id);
    // socket.emit('new-coin', 'gimme');
    // item = {};
    // item = null;
  // });

  // Handle new coin gen
  socket.on('new-coin', newCoin => {
    item = new Coin(newCoin);
  });

  // Handle player disconnection
  socket.on('remove-player', id => {
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

  context.strokeStyle = 'white';
  // const centerX = canvas.width / 2;
  // const centerY = canvas.height / 2;

  // Gives text outside the border a pixelated look
  // context.clearRect(centerX - (canvas.width - 11) / 2, centerY - (canvas.height - (bannerHeight)) / 2, canvas.width - 11, canvas.height - (bannerHeight - 44));

  // Create border for play field
  context.strokeRect(canvasCalcs.playFieldMinX, canvasCalcs.playFieldMinY, canvasCalcs.playFieldWidth, canvasCalcs.playFieldHeight);
  // console.log(centerX - (canvas.width - 10) / 2, centerY - (canvas.height - bannerHeight) / 2, canvas.width - 10, canvas.height - (bannerHeight - 45)) // 5 50 630 425

  // Controls text
  context.fillStyle = 'white';
  context.font = `15px 'Press Start 2P'`;
  context.fillText('Controls: WASD', 10, 32.5);

  currPlayers.forEach(player => player.draw(context, item));

  // Remove destroyed coin
    item.draw(context);
    if (item.destroyed) {
      socket.emit('destroy-item', { playerId: item.destroyed, coinId: item.id });
    }

  if (endGame) {
    context.fillStyle = 'white';
    context.font = `15px 'Press Start 2P'`
    context.textAlign = "center";
    context.fillText(`You ${endGame}! Restart and try again.`, canvasCalcs.canvasWidth / 2, 80);
  }

  if (!endGame) requestAnimationFrame(draw);
}
