import R from 'ramda';
import initPeople from './people';
import initCompanies from './companies';
import initTags from './tags';
import initCities from './cities';
import initCountries from './countries';
import initSkills from './skills';
import initNotes from './notes';
import initStatus from './status';

const allServices = [
  initNotes,
  initSkills,
  initCountries,
  initCities,
  initTags,
  initCompanies,
  initPeople,
  initStatus,
];

const init = evtx => R.reduce((acc, service) => acc.configure(service), evtx, allServices);
export default init;
