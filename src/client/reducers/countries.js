import R from 'ramda';

import { COUNTRIES_LOADED } from '../actions/countries';

const countries = (state = { data: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case COUNTRIES_LOADED:
      return { ...state, data: R.concat(state.data, payload) };
    default:
      return state;
  }
};

export default countries;
