// Socket.io setup
const socket = require('socket.io');
const Player = require("./public/Player");
let players = [];
const server = require('.server.js');

// Start server and bind 
// Socket.io to the same port
const io = socket(server);

io.sockets.on("connection", socket => {
  console.log('Client connected...');
  console.log(`New connection ${socket.id}`);
  players.push(new Player(socket.id));

  socket.on("disconnect", () => {
    io.sockets.emit("disconnect", socket.id);
    players = players.filter(player => player.id !== socket.id);
  });
});

io.sockets.on("disconnect", socket => {
  io.sockets.emit("disconnect", socket.id);

  players = players.filter(player.id !== socket.id);
});

updateGame = () => {
  io.sockets.emit("heartbeat", players);
}

setInterval(updateGame, 16);