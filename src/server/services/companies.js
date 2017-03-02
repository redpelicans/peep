import debug from 'debug';
import moment from 'moment';
import R from 'ramda';
import { Company, Preference, Note } from '../models';
import { formatInput, formatOutput } from './utils';
import uppercamelcase  from 'uppercamelcase';

const loginfo = debug('peep:evtx');
const SERVICE_NAME = 'companies';

export const company = {
  load() {
    return Company.loadAll().then(companies => Preference.spread('company', this.user, companies));
  },

  add(company) {
    const isPreferred = Boolean(company.preferred);
    const noteContent = company.note;
    const insertOne = company => Company.collection.insertOne(company).then(R.prop('insertedId'));
    const loadOne = id => Company.loadOne(id);
    const updatePreference = company => Preference.update('company', this.user, isPreferred, company);
    const createNote = company => Note.create(noteContent, this.user, company);
    const updatedCompany = R.omit(['note'], { ...company, createdAt: new Date() });

    return insertOne(updatedCompany)
      .then(loadOne)
      .then(updatePreference)
      .then(createNote)
      .then(({ entity: company, note }) => {
        this.emit('new', company);
        const noteSrv = this.evtx.service('notes');
        noteSrv && noteSrv.emit('new', note);
        return company;
      });
  },
};

export const outMaker = (company) => {
  company.createdAt = company.createdAt || new Date(1967, 9, 1);
  if (!company.updatedAt && moment.duration(moment() - company.createdAt).asHours() < 2) company.isNew = true;
  else if (company.updatedAt && moment.duration(moment() - company.updatedAt).asHours() < 1) company.isUpdated = true;
  return company;
};

export const outMakerMany = R.map(outMaker);

export const inMaker = (company) => {
  const attrs = ['name', 'type', 'preferred', 'website', 'note'];
  const newCompany = R.pick(attrs, company);
  if(company.address){
    const attrs = ['street', 'zipcode', 'city', 'country'];
    newCompany.address = R.pick(attrs, company.address);
  }

  if(company.avatar){
    const attrs = ['src', 'url', 'color', 'type'];
    newCompany.avatar = R.pick(attrs, company.avatar);
  }

  if(company.tags){
    newCompany.tags = R.compose(R.sortBy(R.prop(0)), R.uniq, R.filter(R.identity), R.map(t => uppercamelcase(t)))(company.tags);
  }

  if (newCompany.type) newCompany.type = newCompany.type.toLowerCase();

  return newCompany;
};

const init = (evtx) => {
  evtx.use(SERVICE_NAME, company);
  evtx.service(SERVICE_NAME)
    .before({ 
      add: [formatInput(inMaker)],
    })
    .after({ 
      load: [formatOutput(outMakerMany)],
      add: [formatOutput(outMaker)],
    });

  loginfo('companies service registered');
};

export default init;
