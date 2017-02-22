import socketIO from 'socket.io';
import debug from 'debug';
import evtX from '../lib/evtx';
import People from '../services/people';
import check_token from './middlewares/check_token';

const loginfo = debug('peep:socketIO');
const init = (config, http) => {
  const io = socketIO(http);
  const evtx = evtX(io);
  const promise = new Promise((resolve) => {
    evtx
      .use(check_token)
      .use('people', new People());
    loginfo(`server started on ${http.url}`);
    resolve(evtx);
  });

  return promise;
};

export default init;
