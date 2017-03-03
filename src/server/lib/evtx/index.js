import debug from 'debug';
import EventEmitter from 'events';

const loginfo = debug('evtx');
const isFunction = obj => typeof obj === 'function';
const reduceHooks = (ctx, hooks) => hooks.reduce((acc, hook) => acc.then(hook), Promise.resolve(ctx));

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
      return (methodObj.bind(ctx)(ctx.input)).then(data => ({...ctx, output: data }));
    }

    const execMethodMiddlewares = ctx => {
      const { method } = ctx;
      const hooks = [...this.getBeforeHooks(method), baseMethod, ...this.getAfterHooks(method)];
      return reduceHooks(ctx, hooks);
    };

    this[key] = ctx => {
      const hooks = [...this.getBeforeHooks(), execMethodMiddlewares, ...this.getAfterHooks()];
      return reduceHooks(ctx, hooks);
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
  constructor(config) {
    this.services = {};
  }

  configure(fct) {
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

  run(message, globalContext) {
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
      ...globalContext,
      message,
      service,
      method,
      input,
      output: {}, 
      evtx: this,
      emit(...params) {
        return this.evtx.service(this.service).emit(...params);
      }
    };

    const hooks = [...this.getBeforeHooks(), execMethod, ...this.getAfterHooks()];
    return reduceHooks(ctx, hooks).then(ctx => ctx.output);

  }
}

export default () => new EvtX();
