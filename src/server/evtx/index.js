import debug from 'debug';
import evtX from '../lib/evtx';
import initPeople from '../services/people';

const formatServiceMethod = (ctx) => {
  const { message: { type } } = ctx;
  const [service, method] = type.split(':');
  return Promise.resolve({ 
    ...ctx, 
    service: service && service.toLowerCase(), 
    method: method && method.toLowerCase(),
  });
};

const formatResponse = (ctx) => {
  const { output, message: { replyTo }} = ctx;
  if (replyTo) return Promise.resolve({ ...ctx, output: { ...output, type: replyTo }});
  return Promise.resolve(ctx);
};

const loginfo = debug('peep:evtx');
const init = (ctx) => {
  const { io } = ctx;
  const promise = new Promise((resolve) => {
    const evtx = evtX()
      .before(formatServiceMethod)
      .register(initPeople)
      .after(formatResponse);

    io.on('connection', (socket) => {
      socket.on('action', (message) => {
        loginfo(`receive ${message.type} action`);
        const ctx = { ...message, evtx, io, socket };
        evtx.run(ctx)
          .then((res) => {
            socket.emit('action', res)
            loginfo(`sent ${res.type} action`);
          })
          .catch((error) => {
            console.error(error);
            socket.emit('action', { type: 'EVTX:ERROR', error })
          });
      });
    });

    loginfo(`EvtX setup.`);
    resolve({ ...ctx, evtx });
  });

  return promise;
};


export default init;
