import should from 'should';
import { Client, Company } from '..';
import { connect, close, drop, load } from './utils';

const data = {
  collections:{
    companies: [
      {
        _id: 1,
        name: 'name1',
        type: 'client',
      },
      {
        name: 'name2',
        type: 'client',
      },
      {
        name: 'name3',
        type: 'partner',
      }
    ]
  }
};

describe('Models checks', function() {
  before(() => connect(this));
  beforeEach(() => drop(this).then(() => load(this, data)));
  after(close);

  it('[Company] should find all', (done) => {
    Company
      .loadAll()
      .then( objs => {
        const names = objs.map(obj => obj.name).join('');
        should(names).equal(data.collections.companies.map(obj => obj.name).join(''));
        should(objs[0].is(Client)).true();
        done();
    })
    .catch(done);
  });

  it('[Company] should load one', (done) => {
    const { _id } = data.collections.companies[0];
    Company
      .loadOne(_id)
      .then( obj => {
        should(obj._id).equal(_id);
        done();
    })
    .catch(done);
  });

  it('[Company] should find one', (done) => {
    const { name } = data.collections.companies[0];
    Company
      .findOne({ name })
      .then( obj => {
        should(obj.name).equal(name);
        done();
    })
    .catch(done);
  });

});


