export const LOAD_COMPANIES = 'EVTX:SERVER:COMPANIES:LOAD';
export const COMPANIES_LOADED = 'COMPANIES:LOADED';
export const ADD_COMPANY = 'EVTX:SERVER:COMPANIES:ADD';
export const COMPANY_ADDED = 'COMPANY:ADDED';
export const UPDATE_COMPANY = 'EVTX:SERVER:COMPANIES:UPDATE';
export const COMPANY_UPDATED = 'COMPANY:UPDATED';

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

export const updatePreferred = company => (dispatch) => {
  dispatch({
    type: UPDATE_COMPANY,
    payload: company,
    replyTo: COMPANY_UPDATED,
  });
};

export default { loadCompanies, addCompany };
