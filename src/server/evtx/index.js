import debug from 'debug';
import R from 'ramda';
import evtX from '../lib/evtx';
import initPeople from '../services/people';
import initCompanies from '../services/companies';
import initTags from '../services/tags';
import initCities from '../services/cities';
import initCountries from '../services/countries';
import initSkills from '../services/skills';
import initNotes from '../services/notes';

const formatServiceMethod = (ctx) => {
  const { message: { type, payload } } = ctx;
  const [service, method] = type.split(':');
  return Promise.resolve({ 
    ...ctx, 
    input: payload,
    service: service && service.toLowerCase(), 
    method: method && method.toLowerCase(),
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
const init = (ctx) => {
  const { io } = ctx;
  const promise = new Promise((resolve) => {
    const evtx = evtX()
      .before(formatServiceMethod)
      .configure(initPeople)
      .configure(initCompanies)
      .configure(initTags)
      .configure(initCities)
      .configure(initCountries)
      .configure(initSkills)
      .configure(initNotes)
      .after(formatResponse);

    io.on('connection', (socket) => {
      socket.on('action', (message) => {
        loginfo(`receive ${message.type} action`);
        const globalCtx = { io, socket, user: { _id: 0 } };
        evtx.run(message, globalCtx)
          .then((res) => {
            if (res.broadcastMode) {
              io.emit('action', R.omit(['broadcastMode'], res));
              loginfo(`broadcasted ${res.type} action`);
            }
            else {
              socket.emit('action', res)
              loginfo(`sent ${res.type} action`);
            }
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
