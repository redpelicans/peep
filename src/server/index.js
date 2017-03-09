import debug from 'debug';
import initHttp from './http';
import initSocketIO from './socketio';
import initEvtx from './evtx';
import initMongo from './mongo';
import config from '../../config';

const loginfo = debug('peep');

initMongo({ config })
  .then(initHttp)
  .then(initSocketIO)
  .then(initEvtx)
  .then(() => loginfo('server started, don\'t sleep !'))
  .catch(err => console.error(err.stack)); // eslint-disable-line no-console
