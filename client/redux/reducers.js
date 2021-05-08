import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import node from './node/reducer';
import songs from './songs/reducer';

export default createStore(combineReducers({
  node,
  songs,
}), applyMiddleware(thunk));
