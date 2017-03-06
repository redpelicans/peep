import R from 'ramda';

export const LOAD_COUNTRIES = 'EvtX:Server:countries:load';
export const COUNTRIES_LOADED = 'countries:loaded';

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
