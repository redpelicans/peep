import { ADD_ALERT } from '../actions/message';
import { COMPANY_ADDED } from '../actions/companies';

let id = 0;

const message = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_ALERT:
      return {
        id: (id += 1),
        ...payload,
      };
    case COMPANY_ADDED:
      return {
        id: (id += 1),
        type: 'success',
        message: `Company '${payload.name}' added`,
      };
    default:
      return state;
  }
};

export default message;
