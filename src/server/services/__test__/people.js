import should from 'should';
import sinon from 'sinon';
import { people } from '../people';
import { Person, Preference } from '../../models';

const data = {
  collections:{
    preferences: [
      {
        personId : 0,
        entityId : 2,
        type : "person",
      },
      {
        personId : 0,
        entityId : 3,
        type : "person",
      },
    ],
    people: [
      {
        _id: 1,
        tags: ['A', 'B'],
        _isPreferred: false,
      },
      {
        _id: 2,
        tags: ['B'],
        _isPreferred: true,
      },
      {
        _id: 3,
        tags: ['B', 'C'],
        _isPreferred: true,
      }
    ]
  }
};

describe('Services checks', function() {
  it('[People::load]', (done) => {
    const personStub = sinon.stub(Person, 'loadAll', () => Promise.resolve(data.collections.people));
    const preferenceStub = sinon.stub(Preference, 'findAll', () => Promise.resolve(data.collections.preferences));
    people.load({ user: { _id: 0 } })
      .then( people => {
        personStub.restore();
        preferenceStub.restore();
        people.forEach(p => should(p.preferred === p._isPreferred));
        done();
    })
    .catch(done);
  });

});


