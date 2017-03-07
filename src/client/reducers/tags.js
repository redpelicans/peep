import { TAGS_LOADED } from '../actions/tags';

const tags = (state = { data: [] }, action) => {
  switch (action.type) {
    case TAGS_LOADED:
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

export default tags;
