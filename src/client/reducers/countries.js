import R from 'ramda';

import { COUNTRIES_LOADED } from '../actions/countries';
import { COMPANY_ADDED } from '../actions/companies';

const addCountry = (country, countries) =>
  R.compose(R.sortBy(R.toLower), R.uniq, R.concat(countries))([country]);

const countries = (state = { data: [] }, action) => {
  const { type, payload } = action;

  switch (type) {
    case COUNTRIES_LOADED:
      return { ...state, data: R.concat(state.data, payload) };
    case COMPANY_ADDED: {
      const { country } = payload.address;
      return (country) ? { ...state, data: addCountry(country, state.data) } : state;
    }
    default:
      return state;
  }
};

export default countries;
