const controls = (player, socket) => {
  const getKey = e => {
    if (e.keyCode === 87) return 'W';
    if (e.keyCode === 83) return 'S';
    if (e.keyCode === 65) return 'A';
    if (e.keyCode === 68) return 'D';
  }

  document.onkeydown = e => {
    let dir = getKey(e);

    if (dir) {
      player.moveDir(dir);

      // Pass current player position back to the server
      socket.emit('move-player', dir, { x: player.x, y: player.y });
    }
  }

  document.onkeyup = e => {
    let dir = getKey(e);

    if (dir) {
      player.stopDir(dir);

      // Pass current player position back to the server
      socket.emit('stop-player', dir, { x: player.x, y: player.y });
    }
  }
}

export default controls;
