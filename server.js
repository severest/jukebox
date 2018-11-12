const WebSocket = require('ws');

const { websocketPort } = require('./config/config.json');

const wss = new WebSocket.Server({ port: websocketPort });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

wss.on('connection', (ws) => {
  ws.isAlive = true;
  ws.on('pong', function pong() {
    this.isAlive = true;
  });
  ws.on('message', (message) => {
    console.log('received: %s', message);
  });
});

setInterval(() => {
  wss.clients.forEach((ws) => {
    if (ws.isAlive === false) return ws.terminate();

    ws.isAlive = false;
    ws.ping(() => {});
  });
}, 30000);
