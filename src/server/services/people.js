import async from 'async';
import debug from 'debug';
import moment from 'moment';
import { Person, Preference } from '../models';
import { format } from './utils';

const loginfo = debug('peep:evtx');
const SERVICE_NAME = 'people';
const loadAll = cb => Person.findAll({ isDeleted: { $ne: true } }, cb);
const people = {
  load(ctx) {
    const promise = new Promise((resolve, reject) => {
      async.waterfall([
        loadAll,
        //Preference.spread.bind(Preference, 'person', req.user),
      ], (err, persons) => {
        if (err) return reject(err);
        resolve(persons);
      });
    });
    return promise;
  },
};

const maker = (person) => {
  person.name = person.fullName();
  person.createdAt = person.createdAt || new Date(1967, 9, 1);
  if (!person.updatedAt && moment.duration(moment() - person.createdAt).asHours() < 2) person.isNew = true;
  else if (person.updatedAt && moment.duration(moment() - person.updatedAt).asHours() < 1) person.isUpdated = true;
  return person;
};

const init = (evtx) => {
  evtx.use(SERVICE_NAME, people);
  evtx.service(SERVICE_NAME)
    .after({
      load: [format(maker)],
    });
  loginfo('people service registered');
  //serv.on('loaded', () => loginfo('People loaded'));
};

export default init;
