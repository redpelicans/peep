import moment from 'moment';
import R from 'ramda';

export const LOAD_COMPANIES = 'EvtX:Server:companies:load';
export const COMPANIES_LOADED = 'companies:loaded';
export const ADD_COMPANY = 'EvtX:Server:companies:add';
export const COMPANY_ADDED = 'company:added';

export const loadCompanies = () => (dispatch, getState) => {
  const { companies } = getState();
  if (!companies.data.length) {
    dispatch({
      type: LOAD_COMPANIES,
      replyTo: COMPANIES_LOADED,
    });
  }
};

export const addCompany = company => (dispatch) => {
  dispatch({
    type: ADD_COMPANY,
    payload: company,
    replyTo: COMPANY_ADDED,
  });
};

export const makeAll = R.map(make);
export const make = (company) => {
  const updatedCompany = { 
    ...company, 
    typeName: 'company',
    createdAt: moment(company.createdAt),
  };
  if (company.updatedAt) updatedCompany.updatedAt = moment(company.updatedAt);
  return updatedCompany;
}

export default { loadCompanies, addCompany };
