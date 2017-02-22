import debug from 'debug';

const loginfo = debug('peep:connector');
const isFunction = obj => typeof obj === 'function';
const toAction = ({ type='', payload }) => {
  const [service, method] = type.split('/');
  return { payload, service, method };
};

class Connector {
  constructor(io, config) {
    this.io = io;
    this.services = {};
    this.middlewares = [];
    this.initIO();
  }

  initIO() {
    this.io.on('connection', socket => {
      socket.on('action', (message) => {
        const action = toAction(message);
        loginfo(`action received: ${message.type}`);
        this.run(socket, action, (err, res) => {
          socket.emit('action', res);
        });
      });
    });
  }

  registerMiddleware(...middlewares) {
    this.middlewares = [...this.middlewares, ...middlewares];
    return this;
  }

  use(...params) {
    const name = params.shift();
    if (isFunction(name)) return this.registerMiddleware(name);
    const service = params.pop();
    this.services[name] = service;
    if (params.length) return this.registerMiddleware(...params);
    return this;
  }

  run(socket, action, cb) {
    const { service: serviceName } = action;
    const { io } = this;
    const service = this.services[action.service];
    if (!service) throw new Error(`Unknown service: ${service}`);
    const ctx = { action, socket, io };
    const middlewares = [...this.middlewares];
    let currentMiddleware;
    const next = (newAction) => {
      currentMiddleware = middlewares.shift();
      if (currentMiddleware) return currentMiddleware(ctx, next, newAction);
      const { method: methodName, payload } = newAction;
      const method = service[methodName];
      if (!method || !isFunction(method)) throw new Error(`Unknown method: ${methodName} for service: ${serviceName}`);
      method(payload, ctx, cb);
    };
    next(action);
  }

}

export default io => new Connector(io);
