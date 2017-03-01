import debug from 'debug';
import moment from 'moment';
import { Company, Preference } from '../models';
import { getUser, format } from './utils';

const loginfo = debug('peep:evtx');
const SERVICE_NAME = 'companies';

export const company = {
load() {
  return Company.loadAll().then(companies => Preference.spread('company', this.user, companies));
  }
};

const maker = (company) => {
  company.createdAt = company.createdAt || new Date(1967, 9, 1);
  if (!company.updatedAt && moment.duration(moment() - company.createdAt).asHours() < 2) company.isNew = true;
  else if (company.updatedAt && moment.duration(moment() - company.updatedAt).asHours() < 1) company.isUpdated = true;
  return company;
};

const init = (evtx) => {
  evtx.use(SERVICE_NAME, company);
  evtx.service(SERVICE_NAME)
    .before({ load: [getUser()] })
    .after({ load: [format(maker)] });

  loginfo('companies service registered');
};

export default init;
