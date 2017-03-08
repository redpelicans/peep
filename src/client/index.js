import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import history from './history';
import { Provider } from 'react-redux';
import socketIO from 'socket.io-client';
import enUS from 'antd/lib/locale-provider/en_US';
import { LocaleProvider } from 'antd';
import configureStore from './store/configureStore';
import App from './components/App';
import { addCompany } from './actions/companies';
import Kontrolo from './lib/kontrolo';

const initialState = {};
const io = socketIO.connect();
io.on('disconnect', () => console.log('socket.io disconnected ...')); // eslint-disable-line no-console
io.on('error', err => console.log(`socket.io error: ${err}`)); // eslint-disable-line no-console
io.on('connect', () => {
  console.log('socket.io connected.'); // eslint-disable-line no-console
});

const store = configureStore(initialState, io);
const mountNode = window.document.getElementById('__PEEP__');

const root = (
  <LocaleProvider locale={enUS}>
    <Provider store={store}>
      <Kontrolo user={state => state.login.user} isAuthorized={user => user}>
        <Router history={history}>
          <App />
        </Router>
      </Kontrolo>
    </Provider>
  </LocaleProvider>
);

console.log('mounting React, peep peep don\'t sleep ...'); // eslint-disable-line no-console
render(root, mountNode);
