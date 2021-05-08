import {
  NODE_CONNECTED,
  NODE_DISCONNECTED,
} from './actions';

const initialState = {
  nodeConnected: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case NODE_CONNECTED:
      return {
        ...state,
        nodeConnected: true,
      };
    case NODE_DISCONNECTED:
      return {
        ...state,
        nodeConnected: false,
      };
    default:
      return state;
  }
};

export default reducer;
