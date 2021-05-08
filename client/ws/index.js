import io from 'socket.io-client'; // eslint-disable-line

import store from '../redux/reducers';
import {
  nodeConnected,
  nodeDisconnected,
} from '../redux/node/actions';

const socket = io({
  path: '/cable',
});

socket.on('initState', (state) => {
  if (state.nodeConnected) {
    store.dispatch(nodeConnected());
  } else {
    store.dispatch(nodeDisconnected());
  }
});

socket.on('nodeConnected', () => {
  store.dispatch(nodeConnected());
});

socket.on('nodeDisconnected', () => {
  store.dispatch(nodeDisconnected());
});

export const addSong = (song) => {
  socket.emit('addSong', song);
};

export default socket;
