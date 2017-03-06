import R from 'ramda';

export const LOAD_CITIES = 'EvtX:Server:cities:load';
export const CITIES_LOADED = 'cities:loaded';

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
