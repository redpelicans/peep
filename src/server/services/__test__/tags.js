import should from 'should';
import sinon from 'sinon';
import { tags } from '../tags';
import { Person, Company } from '../../models';

const data = {
  collections:{
    companies: [
      {
        _id: 1,
      },
      {
        _id: 1,
        tags: ['A', 'B'],
      },
    ],
    people: [
      {
        _id: 1,
        tags: ['A', 'B'],
      },
      {
        _id: 2,
        tags: ['B'],
      },
      {
        _id: 3,
        tags: ['B', 'C'],
      }
    ]
  }
};

describe('Services checks', function() {
  it('[Tags::load]', (done) => {
    const personStub = sinon.stub(Person, 'findAll', () => Promise.resolve(data.collections.people));
    const companyStub = sinon.stub(Company, 'findAll', () => Promise.resolve(data.collections.companies));
    tags.load()
      .then( tags => {
        personStub.restore();
        companyStub.restore();
        should(tags).eql([['A', 2], ['B', 4], ['C', 1]]);
        done();
    })
    .catch(done);
  });

});


