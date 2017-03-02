import debug from 'debug';
import moment from 'moment';
import { Person, Preference } from '../models';
import { formatOutput } from './utils';

const loginfo = debug('peep:evtx');
const SERVICE_NAME = 'people';

export const people = {
  load() {
    return Person.loadAll().then(people => Preference.spread('person', this.user, people));
  }
};

const outMaker= (person) => {
  person.name = person.fullName();
  person.createdAt = person.createdAt || new Date(1967, 9, 1);
  if (!person.updatedAt && moment.duration(moment() - person.createdAt).asHours() < 2) person.isNew = true;
  else if (person.updatedAt && moment.duration(moment() - person.updatedAt).asHours() < 1) person.isUpdated = true;
  return person;
};

const init = (evtx) => {
  evtx.use(SERVICE_NAME, people);
  evtx.service(SERVICE_NAME)
    .after({ load: [formatOutput(outMaker)] });

  loginfo('people service registered');
};

export default init;
