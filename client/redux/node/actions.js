export const NODE_CONNECTED = 'NODE_CONNECTED';
export const NODE_DISCONNECTED = 'NODE_DISCONNECTED';

export const nodeConnected = () => ({
  type: NODE_CONNECTED,
});

export const nodeDisconnected = () => ({
  type: NODE_DISCONNECTED,
});
