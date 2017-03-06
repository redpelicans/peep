import R from 'ramda';
import { makeAll, ADD_COMPANY, COMPANY_ADDED, COMPANIES_LOADED } from '../actions/companies';

const makeCompanies = R.compose(R.fromPairs, R.map(c => [c._id, c]), makeAll);
const companies = (state = { data: { } }, action) => {
  switch (action.type) {
    case COMPANIES_LOADED:
      return { data: makeCompanies(action.payload) };
    case ADD_COMPANY:
      return { ...state, pending_action: true };
    case COMPANY_ADDED:
      return { ...state, pending_action: false, data: { ...state.data, [action.payload._id]: action.payload } };
    default:
      return state;
  }
};

export default companies;
