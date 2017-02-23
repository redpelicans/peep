import debug from 'debug';
import EventEmitter from 'events';

const loginfo = debug('peep:evtx');
const isFunction = obj => typeof obj === 'function';
const messageToAction = ({ type='', input }) => {
  const [service, method] = type.split('/');
  return { input, service, method };
};

export class Service extends EventEmitter {
  constructor(definition) {
    super();
    this.beforeHooks = {}; 
    this.afterHooks = {}; 
    this.setup(definition);
  }

  setup(definition) {
    for(let key of Object.keys(definition)){
      const value = definition[key];
      if(isFunction(value)) this.addMethod(key, value);
    }
  }

  getBeforeHooks(key) {
    return [ 
      ...(this.beforeHooks.all || []),
      ...(key && this.beforeHooks[key] || []),
    ];
  }

  getAfterHooks(key) {
    return [ 
      ...(this.afterHooks.all || []),
      ...(key && this.afterHooks[key] || []),
    ];
  }

  addMethod(key, method) {
    const baseMethod = ctx => (method.bind(this)(ctx))
      .then(data => {
        ctx.output = data
        return ctx;
      });
    this[key] = ctx => {
      const hooks = [...this.getBeforeHooks(key), baseMethod, ...this.getAfterHooks(key)];
      return hooks.reduce((acc, hook) => acc.then(hook), Promise.resolve(ctx));
    }
  }

  before(hooks) {
    this.beforeHooks = hooks;
    return this;
  }

  after(hooks) {
    this.afterHooks = hooks;
    return this;
  }
}

class EvtX {
  constructor(io, config) {
    this.io = io;
    this.services = {};
    this.before = {}
    this.after = {}
    if (io) this.initIO();
  }

  initIO() {
    this.io.on('connection', socket => {
      socket.on('action', (message) => {
        const action = messageToAction(message);
        loginfo(`action received: ${message.type}`);
        this.run(socket, action)
          .then((res) => socket.emit('action', res))
          .catch(error => socket.emit('action', { error }));
      });
    });
  }

  service(path) {
    return this.services[path];
  }

  use(path, service) {
    this.services[path] = new Service(service);
    return this;
  }

  run(socket, action) {
    const { service: serviceName, method: methodName } = action;
    const { io } = this;
    const service = this.service(action.service);
    if (!service) throw new Error(`Unknown service: ${service}`);
    const ctx = { ...action, output: {}, socket, io, evtx: this };
    const method = service[methodName];
    if (!method || !isFunction(method)) throw new Error(`Unknown method: ${methodName} for service: ${serviceName}`);
    return method(ctx).then(ctx => ctx.output);
  }

}

export default io => new EvtX(io);
