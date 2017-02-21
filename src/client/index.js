import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import enUS from 'antd/lib/locale-provider/en_US';
import { LocaleProvider } from 'antd';
import configureStore from './store/configureStore';
import App from './components/App';

const initialState = {};
const store = configureStore(initialState);
const mountNode = window.document.getElementById('__PEEP__');
const root = (
  <LocaleProvider locale={enUS}>
    <Provider store={store}>
      <App />
    </Provider>
  </LocaleProvider>
);

console.log('mounting React Peep peep don\'t sleep ...'); // eslint-disable-line no-console
render(root, mountNode);
