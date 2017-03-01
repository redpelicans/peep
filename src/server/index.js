import initHttp from './http';
import initSocketIO from './socketio';
import initEvtx from './evtx'
import initMongo from './mongo';
import config from '../../config';
import debug from 'debug';

const loginfo = debug('peep');

const initMongoFake = () => Promise.resolve({ config });
import sinon from 'sinon';
import { Person, Company } from './models';
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
const personStub = sinon.stub(Person, 'findAll', () => Promise.resolve(data.collections.people));
const companyStub = sinon.stub(Company, 'findAll', () => Promise.resolve(data.collections.companies));

initMongoFake({ config })
  .then(initHttp)
  .then(initSocketIO)
  .then(initEvtx)
  .then(() => loginfo('server started, don\'t sleep !'))
  .catch(err => console.error(err.stack));
