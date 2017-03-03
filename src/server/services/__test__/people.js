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

describe('People service', function() {
  it('should load', (done) => {
    const personStub = sinon.stub(Person, 'loadAll', () => Promise.resolve(data.collections.people));
    const preferenceStub = sinon.stub(Preference, 'findAll', () => Promise.resolve(data.collections.preferences));
    const end = (...params) => {
      personStub.restore();
      preferenceStub.restore();
      done(...params);
    };
    people.load.bind({ user: { _id: 0 } })()
      .then( people => {
        people.forEach(p => should(p.preferred === p._isPreferred));
        end();
    })
    .catch(end);
  });

});


