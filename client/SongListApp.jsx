import React from 'react';
import io from 'socket.io-client';

const socket = io({
  path: '/cable',
});
socket.emit('chat message', 'HEYOOOO');

class SongListApp extends React.Component {
  render() {
    return (
      <div>hi</div>
    );
  }
}

export default SongListApp;
