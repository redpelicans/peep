import socketIO from 'socket.io';
import debug from 'debug';
import evtX from '../lib/evtx';
import people from '../services/people';
//import check_token from './middlewares/check_token';

const loginfo = debug('peep:socketIO');
const init = (config, http) => {
  const io = socketIO(http);
  const evtx = evtX(io);
  const promise = new Promise((resolve) => {
    evtx
      .use('people', people);
    loginfo(`server started on ${http.url}`);
    const serv = evtx.service('people');
    serv.on('loaded', () => loginfo('People loaded'));
    resolve(evtx);
  });

  return promise;
};

export default init;
