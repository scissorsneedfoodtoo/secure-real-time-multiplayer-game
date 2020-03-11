import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import expect from 'chai';
import helmet from 'helmet';
import cors from 'cors';

import fccTestingRoutes from './routes/fcctesting.js';
import runner from './test-runner.js';

const app = express();

app.use(helmet());
app.use(helmet.noCache());
app.use(helmet.hidePoweredBy({ setTo: 'PHP 7.4.3' }));
app.use('/public', express.static(process.cwd() + '/public'));
app.use(cors({origin: '*'})); //For FCC testing purposes only

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  }); 

//For FCC testing purposes
fccTestingRoutes(app);
    
// 404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

const portNum = process.env.PORT || 3000;

// Set up server and tests
const server = app.listen(portNum, () => {
  console.log(`Listening on port ${portNum}`);
  if (process.env.NODE_ENV==='test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      } catch (error) {
        console.log('Tests are not valid:');
        console.error(error);
      }
    }, 1500);
  }
});

// Socket.io setup:
// Start app and bind 
// Socket.io to the same port
import socket from 'socket.io';
const io = socket(server);
import Coin from './public/Coin.mjs';
import { generateStartPos, canvasCalcs } from './public/canvas-data.mjs';

let currPlayers = [];

const generateCoin = () => {
  const rand = Math.random();
  let coinVal;

  if (rand < 0.6) {
    coinVal = 1;
  } else if (rand < 0.85) {
    coinVal = 2;
  } else {
    coinVal = 3;
  }

  return new Coin({ 
    x: generateStartPos(canvasCalcs.playFieldMinX, canvasCalcs.playFieldMaxX, 5),
    y: generateStartPos(canvasCalcs.playFieldMinY, canvasCalcs.playFieldMaxY, 5),
    val: coinVal
  });
}

let coin = generateCoin();

io.sockets.on('connection', socket => {
  console.log(`New connection ${socket.id}`);

  socket.emit('init', { id: socket.id, players: currPlayers, coin });

  socket.on('new-player', obj => {
    obj.id = socket.id;
    currPlayers.push(obj);
    socket.broadcast.emit('new-player', obj);
  });

  socket.on('move-player', (dir, obj) => {
    socket.broadcast.emit('move-player', { id: socket.id, dir });
    const movingPlayer = currPlayers.find(player => player.id === socket.id);
    if (movingPlayer) {
      movingPlayer.x = obj.x;
      movingPlayer.y = obj.y;
    }
  });

  socket.on('stop-player', (dir, obj) => {
    socket.broadcast.emit('stop-player', { id: socket.id, dir });
    const stoppingPlayer = currPlayers.find(player => player.id === socket.id);
    if (stoppingPlayer) {
      stoppingPlayer.x = obj.x;
      stoppingPlayer.y = obj.y;
    }
  });
  
  socket.on('destroy-item', ({ playerId, coinVal }) => {
    const scoringPlayer = currPlayers.find(obj => obj.id === playerId);
    const sock = io.sockets.connected[scoringPlayer.id];

    scoringPlayer.score += coinVal;

    sock.emit('update-player', scoringPlayer);
    // Communicate win state and broadcast losses
    if (scoringPlayer.score >= 25) {
      sock.emit('end-game', 'win');
      sock.broadcast.emit('end-game', 'lose');
    } 

    // Generate new coin and send it to all players
    coin = generateCoin();
    io.emit('new-coin', coin);
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('remove-player', socket.id);
    currPlayers = currPlayers.filter(player => player.id !== socket.id);
  });
});

export default app; // For testing
