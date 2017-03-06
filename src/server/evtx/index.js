import debug from 'debug';
import R from 'ramda';
import evtX from '../lib/evtx';
import initServices from '../services';

const formatServiceMethod = (ctx) => {
  const { message: { type, payload } } = ctx;
  const [service, method] = type.split(':');
  return Promise.resolve({ 
    ...ctx, 
    input: payload,
    service,
    method,
  });
};

const formatResponse = (ctx) => {
  const { output, message: { replyTo }} = ctx;
  if (replyTo) return Promise.resolve({ 
    ...ctx, 
    output: { 
      payload: output, 
      type: replyTo,
      broadcastMode: ctx.broadcastMode,
    }
  });
  return Promise.resolve(ctx);
};

const loginfo = debug('peep:evtx');
const logerror = debug('peep');
const init = (ctx) => {
  const { io } = ctx;
  const promise = new Promise((resolve) => {
    const evtx = evtX()
      .before(formatServiceMethod)
      .configure(initServices)
      .after(formatResponse);

    io.on('connection', (socket) => {
      socket.on('action', (message, cb) => {
        loginfo(`receive ${message.type} action`);
        const globalCtx = { io, socket, user: { _id: 0 } };
        evtx.run(message, globalCtx)
          .then((res) => {
            if (cb) return cb(null, res);
            else if (res.broadcastMode) {
              io.emit('action', R.omit(['broadcastMode'], res));
              loginfo(`broadcasted ${res.type} action`);
            }
            else {
              socket.emit('action', res)
              loginfo(`sent ${res.type} action`);
            }
          })
          .catch((error) => {
            logerror(error);
            if (cb) return cb(error);
            socket.emit('action', { type: 'EvtX:Error', error })
          });
      });
    });

    loginfo(`EvtX setup.`);
    resolve({ ...ctx, evtx });
  });

  return promise;
};


export default init;
