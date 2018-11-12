const http = require('http').createServer();
const io = require('socket.io')({
  path: '/cable',
  serveClient: false,
});

io.attach(http);

const { websocketPort } = require('./config/config.json');

console.log(`Starting websocket server on port ${websocketPort}...`);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chat message', (msg) => {
    console.log(`message: ${msg}`);
  });
});

http.listen(websocketPort, () => {
  console.log(`listening on *:${websocketPort}`);
});
