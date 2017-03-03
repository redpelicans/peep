import {
  COMPANIES_LOADED,
  UPDATE_PREFERRED,
} from '../actions/companies';

const companies = (state = [], action) => {
  const { payload } = action;
  switch (action.type) {
    case COMPANIES_LOADED:
      return payload;
    case UPDATE_PREFERRED:
      console.log('payload: ', payload);
      console.log('state: ', state);
      return state;
    default: return state;
  }
};

export default companies;
