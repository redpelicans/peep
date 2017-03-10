import { NOTES_LOADED, FILTER_NOTES_LIST } from '../actions/notes';

const notes = (state = { data: [] }, action) => {
  switch (action.type) {
    case NOTES_LOADED:
      return { ...state, data: action.payload };
    case FILTER_NOTES_LIST:
      return { ...state, filter: action.filter };
    default:
      return state;
  }
};

export default notes;

