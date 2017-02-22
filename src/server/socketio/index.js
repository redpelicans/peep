import socketIO from 'socket.io';
import debug from 'debug';
import connectorIO from '../lib/connector';
import People from '../services/people';
import check_token from './middlewares/check_token';

const loginfo = debug('peep:socketio');
const init = (config, http) => {
  const io = socketIO(http);
  const connector = connectorIO(io);
  const promise = new Promise((resolve) => {
    connector
      .use(check_token)
      .use('people', new People());
    loginfo('SocketIO server started');
    resolve(connector);
  });

  return promise;
};

export default init;
