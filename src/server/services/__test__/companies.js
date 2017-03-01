import should from 'should';
import sinon from 'sinon';
import { company } from '../companies';
import { Company, Preference } from '../../models';

const data = {
  collections:{
    preferences: [
      {
        personId : 0,
        entityId : 2,
        type : "company",
      },
      {
        personId : 0,
        entityId : 3,
        type : "company",
      },
    ],
    companies: [
      {
        _id: 1,
        _isPreferred: false,
      },
      {
        _id: 2,
        _isPreferred: true,
      },
      {
        _id: 3,
        _isPreferred: true,
      }
    ]
  }
};

describe('Services checks', function() {
  it('[Companies::load]', (done) => {
    const companyStub = sinon.stub(Company, 'loadAll', () => Promise.resolve(data.collections.companies));
    const preferenceStub = sinon.stub(Preference, 'findAll', () => Promise.resolve(data.collections.preferences));
    const end = (...params) => {
      companyStub.restore();
      preferenceStub.restore();
      done(...params);
    };
    company.load.bind({ user: { _id: 0 } })()
      .then( companies => {
        companies.forEach(p => should(p.preferred === p._isPreferred));
        end();
    })
    .catch(end);
  });

});


