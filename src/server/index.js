import initHttp from './http';
import initSocketIO from './socketio';
import config from '../../config';
import debug from 'debug';

const loginfo = debug('peep');

initHttp(config)
  .then(http => initSocketIO(config, http))
  .then(() => loginfo('server started, don\'t sleep !'))
  .catch(console.error);

