const controls = (player, socket) => {
  document.onkeydown = e => {
    let dir;
    if (e.keyCode === 87 || e.keyCode === 38) dir = 'up'; // w or up arrow
    if (e.keyCode === 83 || e.keyCode === 40) dir = 'down'; // s or down arrow
    if (e.keyCode === 65 || e.keyCode === 37) dir = 'left'; // a or left arrow
    if (e.keyCode === 68 || e.keyCode === 39) dir = 'right'; // d or right arrow

    player.move(dir);
    // Pass current player position back to the server
    socket.emit('move-player', dir, { x: player.x, y: player.y });
  }

  document.onkeyup = e => {
    let dir;
    if (e.keyCode === 87 || e.keyCode === 38) dir = 'up'; // w or up arrow
    if (e.keyCode === 83 || e.keyCode === 40) dir = 'down'; // s or down arrow
    if (e.keyCode === 65 || e.keyCode === 37) dir = 'left'; // a or left arrow
    if (e.keyCode === 68 || e.keyCode === 39) dir = 'right'; // d or right arrow

    player.stop(dir);
    // Pass current player position back to the server
    socket.emit('stop-player', dir, { x: player.x, y: player.y });
  }
}

export default controls;
