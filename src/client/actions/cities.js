import R from 'ramda';

export const LOAD_CITIES = 'EVTX:SERVER:CITIES:LOAD';
export const CITIES_LOADED = 'CITIES:LOADED';

export const loadCities = () => (dispatch, getState) => {
  const { cities } = getState();
  if (R.isEmpty(cities)) {
    dispatch({
      type: LOAD_CITIES,
      replyTo: CITIES_LOADED,
    });
  }
};

export default { loadCities };
