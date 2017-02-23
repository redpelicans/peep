import debug from 'debug';
import EventEmitter from 'events';

const loginfo = debug('peep:evtx');
const isFunction = obj => typeof obj === 'function';
const toAction = ({ type='', data }) => {
  const [service, method] = type.split('/');
  return { data, service, method };
};

export class Service extends EventEmitter {
  constructor() {
    super();
    this.serviceMiddlewares = []; 
  }
  
  register(app, path) {
    this.app = app;
    this.path = path;
  }

  middlewares() {
    return this.serviceMiddlewares;
  }

  use(...params) {
    this.serviceMiddlewares = [...this.serviceMiddlewares, ...params];
  }
}

class EvtX {
  constructor(io, config) {
    this.io = io;
    this.services = {};
    this.middlewares = [];
    if (io) this.initIO();
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

  service(path) {
    return this.services[path];
  }

  registerService(path, service, ...middlewares) {
    this.services[path] = service;
    if (middlewares) service.use(...middlewares);
    return service;
  }

  use(...params) {
    const path = params.shift();
    if (isFunction(path)) this.registerMiddleware(path);
    else {
      const service = params.pop();
      this.registerService(path, service, ...params);
    }
    return this;
  }

  run(socket, action, cb) {
    const { service: serviceName } = action;
    const { io } = this;
    const service = this.service(action.service);
    if (!service) throw new Error(`Unknown service: ${service}`);
    const ctx = { ...action, socket, io };
    const middlewares = [...this.middlewares, ...service.middlewares()];
    let currentMiddleware;
    const next = (newContext) => {
      currentMiddleware = middlewares.shift();
      if (currentMiddleware) return currentMiddleware(newContext, next);
      const { method: methodName } = newContext;
      const method = service[methodName];
      if (!method || !isFunction(method)) throw new Error(`Unknown method: ${methodName} for service: ${serviceName}`);
      method(newContext, cb);
    };
    next(ctx);
  }

}

export default io => new EvtX(io);
