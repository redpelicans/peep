import {
  COMPANIES_LOADED,
} from '../actions/companies';

const companies = (state = [], action) => {
  const { payload } = action;
  switch (action.type) {
    case COMPANIES_LOADED:
      return payload;
    default: return state;
  }
};

export default companies;
