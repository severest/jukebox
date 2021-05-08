import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './styles/application.scss';

// import uuid from './utils/uuid.js';

import NoMatch from './NoMatch';
import SongListApp from './SongListAppRedux';
import store from './redux/reducers';


// let userId = localStorage.getItem('retrobotID');
// if (!userId) {
//   userId = uuid();
//   localStorage.setItem('retrobotID', userId);
// }
// window.myID = userId;
//
// window.addEventListener('online', () => isOnline());
// window.addEventListener('offline', () => isOffline());

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={SongListApp} />
        <Route component={NoMatch} />
      </Switch>
    </BrowserRouter>
  </Provider>
), document.getElementById('app'));
