const http = require('http').createServer();
const io = require('socket.io')({
  path: '/cable',
  serveClient: false,
});

io.attach(http);

const { websocketPort } = require('./config/config.json');

console.log(`Starting websocket server on port ${websocketPort}...`);

const state = {
  nodeConnected: false,
};

io.on('connection', (socket) => {
  const { token } = socket.handshake.query;
  if (token === 'jukeboxnode') {
    socket.broadcast.emit('nodeConnected');
    state.nodeConnected = true;
    socket.on('disconnect', () => {
      socket.broadcast.emit('nodeDisconnected');
      state.nodeConnected = false;
    });
  } else {
    socket.emit('initState', state);
  }
});


http.listen(websocketPort, () => {
  console.log(`listening on *:${websocketPort}`);
});
