import should from 'should';
import sinon from 'sinon';
import { notes } from '../cities';
import { Note } from '../../models/notes';
import evtX from '../../lib/evtx';
import initNotes from '../notes';

const evtx = evtX().configure(initNotes);
const service = evtx.service('notes');
const data = {
  collections:{
    notes: [
      {
        _id: 1,
        content: 'content1',
        entityType: 'company',
      },
      {
        _id: 2,
        content: 'content2',
        entityType: 'company',
        assigneesIds: [0],
      },
      {
        _id: 3,
        content: 'content3',
        entityType: 'company',
        isDeleted: true,
      },
    ],
  }
};

describe('Cities service', function() {
  it('should load', (done) => {
    const noteStub = sinon.stub(Note, 'findAll', () => Promise.resolve(data.collections.notes));
    const end = (...params) => {
      noteStub.restore();
      done(...params);
    };
    const user = { _id: 0 };
    service.load(null, { user })
      .then( notes => {
        should(notes.map(n => n.content)).eql(data.collections.notes.map(n => n.content));
        end();
    })
    .catch(end);
  });

});


