# EvtX

EvtX is a tiny layer to help method calls in an aspect oriented way. It has been developped to create service oriented socketIO servers. But it's fully independent from socketIO.

It's mainly inspired by express and featherJS's hooks. Compared to featherJS it authorizes to hook any methods and not just CRUD ones, it's just 100 lines of code that help to call methods surrounded by hooks.

# Usage

## Service

A Service is defined by a plain old javascript object:

```
const calculator = {
  name: 'calculator',
  sum(input) {
    return Promise.resolve(sum(input));
  },
  product(input) {
    return Promise.resolve(product(input));
  }
};
```

`sum` and `product` are targets methods. 

Target methods will get an input and must return an output value wrapped in a Promise.
You can use them in an asynchronous context.

Do not use service definition directly, but via `evtx` (see bellow);

## Context

A context object is passed along chain hooks, created first before the first hook, passed via before hooks, used as the execution context `this` of the target method and passed again to after hooks.

A evtx context is made of:
  * `input`: data to transform
  * `output`: data returned by the target method.
  * `service`: service name
  * `method`: method name
  * `evtx`: evtx object, usefull to get an other service (`evtx.service(name)`)
  * `message`: original message passed to `run()`
 

## EvtX

Main object to declare services:

```
  import EvtX fom 'evtx';

  const evtx = EvtX()
    .use(calculator.name, calculator)
    .use('test', testService);
```


To get a service:

```
  const service = evtx.service(calculator.name);
```

Returned service is a wrapper arround previous definition and will be executed in the execution context of an EvtX `context`, not in it's definition context. 

To execute a method on a service:

```
  const message = { method: 'sum', service: calculator.name, input: [1, 2] };
  evtx
    .run(message)
    .then(res => should(res).equal(3))
```

* `{ method, service }` are mandatory props to target a specific method in a service previously declared.
* `input` is an optionnal prop forwarded to target method as input parameter.

or 

```
  evtx.service(calculator.name).sum([1, 2]).then();
```

An EvtX service is an EventEmitter, so to emit a message along hooks chain or within a target meethod, just do:

Target method:

```
  const people = {
    addOne({ people }) {
      return People.add(people).then(newPeople => {
        this.emit('peopleAdded', people);
        return newPeople;
      };
    },
  };

```
Hook:

```
  const emit = ctx => {
    ctx.emit('peopleAdded', people);
    return Promise.resolve(ctx);
  }
```

One can also emit an event ike this:

```
  // in a target method
  this.evtx.service(serviceName).emit( ... );
  // in a hook
  ctx.evtx.service(serviceName).emit( ... );
```

To subscribe to an event:

```
  const service = evtx.service('people');
  service.on('peopleAdded, () => );
```

Warning: `service` may change during hooks chain.

One can use `configure` method to setup a service:

```
  const initPeople = (evtx) => {
    evtx.use('people', people);
    loginfo('people service registered');
  };

  const evtx = evtX()
    .register(initPeople)
    .register( ... );
```

## Hooks

Hooks are kind of middlewares called before and after a service's method.

* before hooks will authorize to transform input, enhance a context, change target service, target method
* after hooks will authorize to transform output and context


Hooks could be registered globally to an evtx object to a service or to individual methods.

A hook is a method like this:

```
  const incInput = (ctx) => {
    const { input } = ctx;
    return Promise.resolve({ ...ctx, input: input.map(x => x+1 ) });
  };
```

Input param is a context that will follow the hooks chain.
This is a service level hook that can be use as a before hook for a service or a method.
Like service's method a hook must return a Promise.

The chain calls looks like this:

```
  run(message)
    => evtx before hooks
      => service before hooks
        => method before hooks
          => method
        => service after hooks
    => evtx after hooks
  => return Promise.resolve(ctx.output)
```

Warning: if you call directly from a service (`evtx.service(serviceName)[methodName](ctx)`) evtx level hooks will not be called.

### Evtx level hook

They are called before or after service level hooks.
Before hooks can enhance the context object and change the target's service and or method:

```
  const changeService = (ctx) => Promise.resolve({ ...ctx, method: 'join', service: 'join' });
```

After hooks can update context and result:

```
  const incResult = (ctx) => {
    const { output } = ctx;
    return Promise.resolve({ ...ctx, output: output + 1 });
  };

```

Register them like this:

```
  evtx.before(changeService, otherHook).after(incResult, otherHook);
```

If `before` or `after` are called many times, only last calls set hooks.


### Service and method level hook

Service hooks are called before or after service's method hooks.
Method hooks are called before or after the service's method call.

Let's define a hook to increment each value of the input array:

```
    const incInput = (ctx) => {
      const { input } = ctx;
      return Promise.resolve({ ...ctx, input: input.map(x => x+1 ) });
    };
```

We will re use `incResult`. So to register service and method level hooks, do:

```
  const bhooks = { 
    all: [incInput],
    'sum': [incInput],
  };
  const ahooks = { 
    all: [incResult],
    'product': [incResult]
  };
  evtx.service(calculator.name)
    .before(bhooks)
    .after(ahooks);
```

Service level hooks can rewrite target method, not method's onces.


## API

* evtx.register()

TODO:

* socketIO ex
