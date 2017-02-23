import { Service } from '../lib/evtx';

class People extends Service{
  load(payload, ctx, cb) {
    const res = [
      { id: 1, name: 'toto' },
      { id: 2, name: 'titi' },
    ];
    setTimeout(() => cb(null, { type: 'people/loaded', payload: res }), 200);;
  }
};

export default People;
