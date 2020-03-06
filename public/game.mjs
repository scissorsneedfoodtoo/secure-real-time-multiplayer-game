import Player from './Player.mjs';
import Coin from './Coin.mjs';
import controls from './controls.mjs';

const socket = io();
// window.socket = io(); // equivalent to io.connect()
const canvas = document.getElementById('game-window');
const context = canvas.getContext('2d');

let currPlayers = [];
let items = [];
let endGame;

socket.on('init', ({ id, players, coins }) => {
  console.log('connected', id);

  // Create our player when we log on
  const player = new Player({ id, main: true });
  controls(player, socket);

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

  // Handle collecting coins
  socket.on('destroy-item', id => { items = items.filter(item => item.id !== id) });

  // Handle player disconnection
  socket.on('remove-player', id => {
    currPlayers = currPlayers.filter(player => player.id !== id);
  });

  // Handle endGame state
  socket.on('end-game', result => endGame = result);

  socket.on('update-player', obj => (player.xp = obj.xp));

  // Populate players list when logging in
  currPlayers = players.map(val => new Player(val)).concat(player);
  // console.log(currPlayers, players);
  items = coins.map(val => new Coin(val));

  draw();
});

const draw = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    currPlayers.forEach(player => player.draw(context, items));

    // Remove destroyed coin
    items.forEach(item => {
      item.draw(context);
      if (item.destroyed) {
        socket.emit('destroy-item', { playerId: item.destroyed, coinId: item.id });
      }
    });

    if (endGame) {
      context.fillStyle = endGame === 'lose' ? 'red' : 'green';
      context.font = '100px ariel';
      context.fillText(`You ${endGame}!`, 100, 100);
    }

    items = items.filter(item => !item.destroyed);

    if (!endGame) requestAnimationFrame(draw);
  }
