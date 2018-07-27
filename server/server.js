/* eslint no-param-reassign: ["error", { "props": false }] */

const express = require('express');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const wss = new WebSocket.Server({ port: 8000 });
app.listen(3000);
app.use(express.static(path.join(__dirname, '../public')));

wss.broadcast = (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

wss.on('connection', (ws) => {
  ws.onmessage = (e) => {
    const event = JSON.parse(e.data);
    if (event.type === 'start') {
      wss.broadcast(JSON.stringify({
        type: 'startPlaying',
      }));
    }
    if (event.type === 'pause') {
      wss.broadcast(JSON.stringify({
        type: 'pause',
      }));
    }
    if (event.type === 'stop') {
      wss.broadcast(JSON.stringify({
        type: 'stop',
      }));
    }
  };
});
