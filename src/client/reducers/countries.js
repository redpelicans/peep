import R from 'ramda';

import { COUNTRIES_LOADED } from '../actions/countries';

const countries = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case COUNTRIES_LOADED:
      return R.concat(state, payload);
    default:
      return state;
  }
};

export default countries;
