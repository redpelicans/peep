export const LOAD_COMPANIES = 'EVTX:SERVER:COMPANIES:LOAD';
export const COMPANIES_LOADED = 'COMPANIES:LOADED';

export const loadCompanies = () => (dispatch, getState) => {
  const { companies } = getState();
  if (!companies.length) {
    dispatch({
      type: LOAD_COMPANIES,
      replyTo: COMPANIES_LOADED,
    });
  }
};
