import should from 'should';
import R from 'ramda';
import sinon from 'sinon';
import evtX from '../../lib/evtx';
import initCompanies, { company } from '../companies';
import initNotes from '../notes';
import { Company, Preference, Note } from '../../models';
import { connect, close, drop } from '../../models/__test__/utils';

const evtx = evtX().configure(initCompanies).configure(initNotes);
const service = evtx.service('companies');

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

describe.only('Companies service', function() {
  before(() => connect(this));
  beforeEach(() => drop(this));
  after(close);

  it('should load', (done) => {
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

  it('should delete', (done) => {
    const company = { 
      name: 'C1',
      preferred: true,
      note: 'note1',
    };
    const user = { _id: 0 };
    const checkCompany = (id) => {
      return Company.findOne({ _id: id }).then((company) => {
        should(company.isDeleted).true();
        return company._id;
      });
    };
    const checkPreferrence = (id) => {
      return Preference.loadAll('company', user).then((preferences) => {
        should(preferences.length).eql(0);
        return id;
      })
    };
    const checkNote = (id) => {
      return Note.loadAllForEntity({ _id: id }).then((notes) => {
        should(notes.length).eql(0);
        return company;
      })
    };

    service.add(company, { user })
      .then(({ _id }) => service.del(_id, { user }))
      .then(checkCompany)
      .then(checkPreferrence)
      .then(checkNote)
      .then(() =>  done())
      .catch(done);
  });

  it('should toggle preferred', (done) => {
    const newCompany = { name: 'C1' };
    const user = { _id: 0 };
    const checkCompany = (company) => {
      return company;
    };
    const checkIsPreferred = (company) => {
      should(company.preferred).true();
      return Preference.loadAll('company', user).then((preferences) => {
        should(preferences[0].personId).eql(user._id);
        should(preferences[0].entityId).eql(company._id);
        return company;
      })
    };
    const checkIsNotPreferred = (company) => {
      should(company.preferred).false();
      return Preference.loadAll('company', user).then((preferences) => {
        should(preferences.length).eql(0);
        return company;
      })
    };

    service.add(newCompany, { user })
      .then(company => service.setPreferred({ _id: company._id, preferred: true }, { user }))
      .then(checkIsPreferred)
      .then(company => service.setPreferred({ _id: company._id, preferred: false }, { user }))
      .then(checkIsNotPreferred)
      .then(() => done())
      .catch(done);
  });


  it('should add', (done) => {
    const newCompany = {
      name: 'C1',
      __trash__: 1,
      type: 'CLIENT',
      address: {
        street: 'street',
        city: 'city',
        __trash__: 1,
      },
      avatar: {
        color: 'color',
        __trash__: 1,
      },
      tags: ['TAG1', 'TAG1', 'TAG2'],
      note: 'note',
      preferred: true,
    };
    const user = { _id: 0 };
    const checkCompany = (company) => {
      const res = {
        name: 'C1',
        type: 'client',
        address: { street: 'street', city: 'city' },
        avatar: { color: 'color' },
        tags: [ 'Tag1', 'Tag2' ],
        isNew: true,
        preferred: true,
      };
      should(R.omit(['_id', 'createdAt', 'constructor'], company)).eql(res);
      return company;
    };
    const checkNote = (company) => {
      return Note.loadAllForEntity(company).then((notes) => {
        should(notes[0].entityId).eql(company._id);
        should(notes[0].content).eql(newCompany.note);
        return company;
      })
    };
    const checkPreferrence = (company) => {
      return Preference.loadAll('company', user).then((preferences) => {
        should(preferences[0].personId).eql(user._id);
        should(preferences[0].entityId).eql(company._id);
        return company;
      })
    };
    let addedCompany;
    let addedNote;
    service.on('new', (company) => {
      addedCompany = company;
    });
    evtx.service('notes').on('new', (note) => {
      addedNote = note;
    });

    service.add(newCompany, { user })
      .then(checkCompany)
      .then(checkNote)
      .then(checkPreferrence)
      .then(() => {
        if (addedCompany && addedNote) done();
      })
      .catch(done);
  });

  it('should update', (done) => {
    const newCompany = {
      name: 'C1',
      type: 'client',
      address: { street: 'street', city: 'city' },
      avatar: { color: 'color', },
      tags: ['TAG1', 'TAG1', 'TAG2'],
      note: 'note',
      preferred: true,
    };
    const updatedCompany = {
      name: 'C2',
      type: 'tenant',
      address: { street: 'street2', city: 'city2' },
      tags: ['TAG1', 'TAG3'],
      note: 'note2',
      preferred: false,
    };

    const user = { _id: 0 };
    const checkCompany = (company) => {
      const res = {
        name: 'C2',
        type: 'tenant',
        address: { street: 'street2', city: 'city2' },
        tags: ['Tag1', 'Tag3'],
        avatar: { color: 'color', },
        note: 'note2',
        preferred: false,
        isUpdated: true,
      };
      should(R.omit(['_id', 'updatedAt', 'createdAt', 'constructor'], company)).eql(res);
      return company;
    };
    const checkPreferrence = (company) => {
      return Preference.loadAll('company', user).then((preferences) => {
        should(preferences.length).eql(0);
        return company;
      })
    };

    service
      .add(newCompany, { user })
      .then(c => service.update({ _id: c._id, ...updatedCompany }, { user }))
      .then(checkCompany)
      .then(checkPreferrence)
      .then(() => done())
      .catch(done);
  });

});
