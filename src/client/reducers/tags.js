import { FILTER_TAGS, TAGS_LOADED } from '../actions/tags';

const tags = (state = { data: [] }, action) => {
  switch (action.type) {
    case FILTER_TAGS:
      return { ...state, filter: action.filter };
    case TAGS_LOADED:
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

export default tags;
