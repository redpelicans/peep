import debug from 'debug';
import R from 'ramda';
import { Company } from '../models';

const basecountries = ['France'];
const loginfo = debug('peep:evtx');
const SERVICE_NAME = 'countries';

export const countries = {
  load() {
    return Company.loadAll({ 'address.country': { $exists: true } }, { 'address.country': 1 })
      .then((companies) => {
        const hallcountries = R.reduce((res, company) => { 
          const country = R.path(['address', 'country'], company);
          if (country) res[country] = country;
          return res;
        }, {}, companies);
        const hbasecountries = R.reduce((res, country) => { res[country] = country; return res }, {}, basecountries);
        const allcountries = R.merge(hbasecountries, hallcountries);
        return R.values(allcountries).sort();
      })
  }
}

const init = (evtx) => {
  evtx.use(SERVICE_NAME, countries);
  loginfo('countries service registered');
};

export default init;
