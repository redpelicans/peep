import debug from 'debug';
import R from 'ramda';
import evtX from '../lib/evtx';
import initServices from '../services';
import Person from '../models/people';

const getUser = (ctx) => {
  const { message: { token } } = ctx;
  if (!token) return Promise.resolve(ctx);
  const { secretKey } = ctx.evtx.config;
  return Person.getFromToken(token, secretKey).then(user => ({ ...ctx, user }));
};

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
<<<<<<< HEAD
  const { output, message: { replyTo } } = ctx;
  if (replyTo) {
    return Promise.resolve({
      ...ctx,
      output: {
        payload: output,
        type: replyTo,
        broadcastMode: ctx.broadcastMode,
      },
    });
  }
=======
  const { output, message: { replyTo }} = ctx;
  if (replyTo) return Promise.resolve({
    ...ctx,
    output: {
      payload: output,
      type: replyTo,
      broadcastMode: ctx.broadcastMode,
    }
  });
>>>>>>> Add update method on service companies
  return Promise.resolve(ctx);
};

const loginfo = debug('peep:evtx');
const logerror = debug('peep:Error');
const init = (ctx) => {
  const { io, config } = ctx;
  const promise = new Promise((resolve) => {
    const evtx = evtX(config)
      .before(getUser, formatServiceMethod)
      .configure(initServices)
      .after(formatResponse);

    io.on('connection', (socket) => {
      socket.on('action', (message, cb) => {
        loginfo(`receive ${message.type} action`);
        const globalCtx = { io, socket };
        evtx.run(message, globalCtx)
          .then((res) => {
            if (cb) {
              loginfo(`answer ${message.type} action`);
              return cb(null, res);
            } else if (res.broadcastMode) {
              io.emit('action', R.omit(['broadcastMode'], res));
              loginfo(`broadcasted ${res.type} action`);
            } else {
              socket.emit('action', res);
              loginfo(`sent ${res.type} action`);
            }
          })
          .catch((err) => {
            const res = R.is(Error, err) ? { code: 500, message: err.toString() } : { code: err.code, message: err.error };
            logerror(res.message);
            if (cb) return cb(res);
            socket.emit('action', { type: 'EvtX:Error', ...res });
          });
      });
    });

    loginfo('EvtX setup.');
    resolve({ ...ctx, evtx });
  });

  return promise;
};


export default init;
