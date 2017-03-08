import { NOTES_LOADED } from '../actions/notes';

const notes = (state = { data: [] }, action) => {
  switch (action.type) {
    case NOTES_LOADED:
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

export default notes;

