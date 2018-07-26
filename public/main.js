/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */

const rickRoll = new Audio('./assets/nevergonnagiveyouup.mp3');
const socket = new WebSocket('ws://127.0.0.1:8000');

const onRickRollStart = () => {
  socket.send(JSON.stringify({
    type: 'start',
  }));
};

const onPauseClick = () => {
  socket.send(JSON.stringify({
    type: 'pause',
  }));
};

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.type === 'startPlaying') {
    rickRoll.play();
  }
  if (data.type === 'pause') {
    rickRoll.pause();
  }
};
