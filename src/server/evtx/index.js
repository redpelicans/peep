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
          .catch((err) => {
            if (cb) return cb(err);
            if (R.is(Error, err)) {
              logerror(err.toString());
              return socket.emit('action', { type: 'EvtX:Error', code: 500, error: err.toString() })
            }
            const { code, error } = err;
            logerror(err.error);
            socket.emit('action', { type: 'EvtX:Error', code: err.code, error: err.error })
          });
      });
    });

    loginfo(`EvtX setup.`);
    resolve({ ...ctx, evtx });
  });

  return promise;
};


export default init;
