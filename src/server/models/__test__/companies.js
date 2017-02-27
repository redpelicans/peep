import should from 'should';
import { Company } from '..';
import { connect, close, drop, load } from './utils';

const data = {
  collections:{
    companies: [
      {
        _id: 1,
        name: 'name1',
      },
      {
        name: 'name2',
      },
      {
        name: 'name3',
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
      .findAll()
      .then( objs => {
        const names = objs.map(obj => obj.name).join('');
        should(names).equal(data.collections.companies.map(obj => obj.name).join(''));
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


