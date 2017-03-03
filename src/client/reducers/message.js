import { ALERT } from '../actions/messages';

const message = (state = {}, action) => {
  switch (action.type) {
    case ALERT:
      return { content: action.message, id: action.id };
    default:
      return state;
  }
};

export default message;

