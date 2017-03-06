import { ADD_COMPANY, COMPANY_ADDED, COMPANIES_LOADED } from '../actions/companies';

const companies = (state = { data: [] }, action) => {
  switch (action.type) {
    case COMPANIES_LOADED:
      return { data: action.payload };
    case ADD_COMPANY:
      return { ...state, pending_action: true };
    case COMPANY_ADDED:
      return { ...state, pending_action: false, data: [...state.data, action.payload] };
    default:
      return state;
  }
};

export default companies;
