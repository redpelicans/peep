import R from 'ramda';

import { CITIES_LOADED } from '../actions/cities';

const cities = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case CITIES_LOADED:
      return R.concat(state, payload);
    default:
      return state;
  }
};

export default cities;
