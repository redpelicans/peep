import debug from 'debug';
import EventEmitter from 'events';

const loginfo = debug('evtx');
const isFunction = obj => typeof obj === 'function';

export class Service extends EventEmitter {
  constructor(definition) {
    super();
    this.beforeHooks = {}; 
    this.afterHooks = {}; 
    this.definition = definition;
    this.setup(definition);
  }

  setup(definition) {
    for(let key of Object.keys(definition)){
      const value = definition[key];
      if(isFunction(value)) this.addMethod(key);
    }
  }

  getBeforeHooks(key='all') {
    return this.beforeHooks[key] || [];
  }

  getAfterHooks(key='all') {
    return this.afterHooks[key] || [];
  }

  addMethod(key) {
    const baseMethod = ctx => {
      const { method, service } = ctx;
      const methodObj = this.definition[method];
      if (!methodObj || !isFunction(methodObj)) throw new Error(`Unknown method: ${method} for service: ${service}`);
      return (methodObj.bind(this)(ctx)).then(data => ({...ctx, output: data }));
    }

    const execMethodMiddlewares = ctx => {
      const { method } = ctx;
      const hooks = [...this.getBeforeHooks(method), baseMethod, ...this.getAfterHooks(method)];
      return hooks.reduce((acc, hook) => acc.then(hook), Promise.resolve(ctx));
    };

    this[key] = ctx => {
      const hooks = [...this.getBeforeHooks(), execMethodMiddlewares, ...this.getAfterHooks()];
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
    if (io) this.initIO();
  }

  register(fct) {
    fct(this);
    return this;
  }

  service(path) {
    return this.services[path];
  }

  use(path, service) {
    this.services[path] = new Service(service);
    return this;
  }

  before(...hooks) {
    this.beforeHooks = hooks;
    return this;
  }

  after(...hooks) {
    this.afterHooks = hooks;
    return this;
  }
  
  getBeforeHooks() {
    return this.beforeHooks || [];
  }

  getAfterHooks() {
    return this.afterHooks || [];
  }

  run(message) {
    const execMethod = (ctx) => {
      const { service, method, input } = ctx;
      const evtXService = this.service(service);
      if (!evtXService) throw new Error(`Unknown service: ${service}`);
      const evtXMethod = evtXService[method];
      if (!evtXMethod || !isFunction(evtXMethod)) throw new Error(`Unknown method: ${method} for service: ${service}`);
      return evtXMethod(ctx);
    }
    const { service, method, input } = message;
    const ctx = { 
      message,
      service,
      method,
      input,
      output: {}, 
    };

    const hooks = [...this.getBeforeHooks(), execMethod, ...this.getAfterHooks()];
    return hooks.reduce((acc, hook) => acc.then(hook), Promise.resolve(ctx)).then(ctx => ctx.output);
  }
}

export default io => new EvtX(io);
