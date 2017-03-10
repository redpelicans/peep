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
import { checkToken, userLogged } from './actions/login';

const token = localStorage.getItem('peepToken');
const initialState = {
  login: { token },
};
const io = socketIO.connect();
io.on('disconnect', () => console.log('socket.io disconnected ...')); // eslint-disable-line no-console
io.on('error', err => console.log(`socket.io error: ${err}`)); // eslint-disable-line no-console

const store = configureStore(initialState, io);
const mountNode = window.document.getElementById('__PEEP__');

const root = (
  <LocaleProvider locale={enUS}>
    <Provider store={store}>
      <Router history={history}>
        <Kontrolo user={state => state.login.user} isAuthorized={user => Boolean(user)} redirect='/login'>
          <App />
        </Kontrolo>
      </Router>
    </Provider>
  </LocaleProvider>
);

console.log('mounting React, peep peep don\'t sleep ...'); // eslint-disable-line no-console
io.on('connect', () => {
  console.log('socket.io connected.'); // eslint-disable-line no-console
  if (token) {
    store.dispatch(checkToken((err, { user, token } = { }) => {
      if (err) console.error(err.message)
      else {
        store.dispatch(userLogged(user, token));
      }
      render(root, mountNode);
    }));
  }
  else {
    render(root, mountNode);
  }
});
