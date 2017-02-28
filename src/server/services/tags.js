import debug from 'debug';
import R from 'ramda';
import { Person, Company } from '../models';

const loginfo = debug('peep:evtx');
const SERVICE_NAME = 'tags';

const groupByTags = (collection) => {
  const htags = {};
  for(let obj of collection){ 
      for(let tag of obj.tags || []){
        if(!htags[tag]) htags[tag] = 1;
        else  htags[tag]++;
      }
  }
  return htags;
};

export const tags = {
  load() {
    const loadCompanies = Company.findAll({ isDeleted: { $ne: true }, 'tags': { $exists: true } }, { 'tags': 1 }).then(groupByTags);
    const loadPeople = Person.findAll({ isDeleted: { $ne: true }, 'tags': { $exists: true } }, { 'tags': 1 }).then(groupByTags);
    return Promise.all([loadCompanies, loadPeople])
      .then(([companyTags, personTags]) => R.toPairs(R.mergeWith(R.add, companyTags, personTags)));
  },
};

const init = (evtx) => {
  evtx.use(SERVICE_NAME, tags);
  loginfo('tags service registered');
};

export default init;
