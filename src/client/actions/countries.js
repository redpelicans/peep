import R from 'ramda';

export const LOAD_COUNTRIES = 'EVTX:SERVER:COUNTRIES:LOAD';
export const COUNTRIES_LOADED = 'COUNTRIES:LOADED';

export const loadCountries = () => (dispatch, getState) => {
  const { countries } = getState();
  if (R.isEmpty(countries)) {
    dispatch({
      type: LOAD_COUNTRIES,
      replyTo: COUNTRIES_LOADED,
    });
  }
};

export default { loadCountries };
