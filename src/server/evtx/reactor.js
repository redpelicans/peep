import debug from 'debug';
import R from 'ramda';
import Company from '../models/companies';
import Person from '../models/people';

const loginfo = debug('peep:reactor');
const logerror = debug('peep:Error');

const getUser = (ctx) => {
  const { user, message: { token } } = ctx;
  if (user) return Promise.resolve(ctx);
  if (!token) return Promise.resolve(ctx);
  const { secretKey } = ctx.evtx.config;
  return Person.getFromToken(token, secretKey).then(user => ({ ...ctx, user }));
};

const formatServiceMethod = (ctx) => {
  const { service, method, message: { type, payload } } = ctx;
  if (service && method) return Promise.resolve(ctx);
  const [serv, meth] = type.split(':');
  return Promise.resolve({
    ...ctx,
    input: payload,
    service: serv,
    method: meth,
  });
};

const makeOutput = (payload, type) => {
  return { payload, type };
};

const formatResponse = (ctx) => {
  const { output, message: { replyTo } } = ctx;
  if (replyTo) {
    return Promise.resolve({
      ...ctx,
      output: makeOutput(output, replyTo),
    });
  }
  return Promise.resolve(ctx);
};

class Reactor {
  constructor(evtx, io) {
    this.io = io;
    this.evtx = evtx;
    this.initEvtX();
    this.initIO();
    this.initEvents();
    this.conx = {};
  }

  initEvtX() {
    this.evtx
      .before(getUser, formatServiceMethod)
      .after(formatResponse);
  }

  getSockets(targetUser) {
    return R.compose(R.pluck('socket'), R.filter(({ user, socket }) => targetUser.equals(user)), R.values)(this.conx);
  }

  getConnectedUsers() {
    return R.compose(R.values, R.reduce((acc, { user }) => { acc[user._id] = user; return acc; }, {}), R.values)(this.conx);
  }

  initCompanies() {
    const { evtx } = this;
    const broadcast = (originalSocket, originalUser, company, type, targetUser, targetSocket) => {
      const action = makeOutput(company, type);
      if (targetSocket === originalSocket) return;
      if (originalUser.equals(targetUser)) return targetSocket.emit('action', action);
      evtx.service('companies')
        .loadOne(company._id, { user: targetUser })
        .then((userCompany) => {
          const action = makeOutput(userCompany, type);
          targetSocket.emit('action', action);
        });
    }
    evtx.service('companies').on('company:added', ({ output, user, socket, message: { replyTo } }) => {
      if (!replyTo) return;
      for(const targetUser of this.getConnectedUsers()) {
        for(const targetSocket of this.getSockets(targetUser)) 
          broadcast(socket, user, output, replyTo, targetUser, targetSocket);
      }
    });
  }

  initAuth() {
    const { evtx } = this;
    evtx.service('auth').on('auth:login', ({ user, socket }) => {
      this.conx[socket.id] = { user, socket };
      loginfo(`user '${user.fullName()}' logged in.`);
    });
    evtx.service('auth').on('auth:logout', ({ socket, user }) => {
      loginfo(`user '${user.fullName()}' logged out.`);
      delete this.conx[socket.id];
    });
  }

  initEvents() {
    this.initAuth();
    this.initCompanies();
  }

  initIO() {
    const { evtx, io } = this;
    io.on('connection', (socket) => {
      socket.on('action', (message, cb) => {
        loginfo(`receive ${message.type} action`);
        const globalCtx = { io, socket };
        evtx.run(message, globalCtx)
          .then((res) => {
            if (cb) {
              loginfo(`answer ${message.type} action`);
              return cb(null, res);
            }
            socket.emit('action', res);
            loginfo(`sent ${res.type} action`);
          })
          .catch((err) => {
            const res = R.is(Error, err) ? { code: 500, message: err.toString() } : { code: err.code, message: err.error };
            console.error(err.stack || res.message);
            if (cb) return cb(res);
            socket.emit('action', { type: 'EvtX:Error', ...res });
          });
      });
    });
  }
};

const init = (evtx, io) => {
  return Promise.resolve(new Reactor(evtx, io));
}

export default init;
