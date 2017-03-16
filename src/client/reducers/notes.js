import R from 'ramda';
import moment from 'moment';
import { NOTES_LOADED, FILTER_NOTES_LIST, SORT_NOTES_LIST, NOTE_UPDATED } from '../actions/notes';

const make = (note) => {
  const updatedNote = { ...note, typeName: 'note', createdAt: moment(note.createdAt) };
  updatedNote.updatedAt = note.updatedAt  ? moment(note.updatedAt) :  moment(note.createdAt);
  return updatedNote;
};

const makeAll = R.map(n => make(n));

const notes = (state = { data: [], sort: {} }, action) => {
  switch (action.type) {
    case NOTES_LOADED:
      return { ...state, data: makeAll(action.payload) };
    case FILTER_NOTES_LIST:
      return { ...state, filter: action.filter };
    case SORT_NOTES_LIST: {
      const { by, order } = state.sort;
      const newOrder = (by === action.sortBy && order === 'asc') ? 'desc' : 'asc';
      return { ...state, sort: { by: action.sortBy, order: newOrder } };
    }
    case NOTE_UPDATED:
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload._id]: make(action.payload),
        }
      }
    default:
      return state;
  }
};

export default notes;
