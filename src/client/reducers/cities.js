import R from 'ramda';

import { CITIES_LOADED } from '../actions/cities';

const cities = (state = { data: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case CITIES_LOADED:
      return { ...state, data: R.concat(state.data, payload) };
    default:
      return state;
  }
};

export default cities;
