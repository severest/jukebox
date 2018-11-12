import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './styles/application.scss';

// import uuid from './utils/uuid.js';

import NoMatch from './NoMatch.jsx';
import SongListApp from './SongListApp.jsx';


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
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={SongListApp} />
      <Route component={NoMatch} />
    </Switch>
  </BrowserRouter>
), document.getElementById('app'));
