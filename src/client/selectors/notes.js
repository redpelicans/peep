import R from 'ramda';
import { createSelector } from 'reselect';

const regexp = filter => new RegExp(filter, 'i');

const match = (filter, content) => R.match(filter, content).length

const doFilter = (filter, notes) => R.filter(note => match(regexp(filter), note.content), notes);

const filterContent = (filter, notes) => {
    console.log('filter, notes ->',filter, notes)
    if (!notes) return null;
	return doFilter(filter, notes)
};

const getFilter = state => state.notes.filter;
const getNotes = state => state.notes.data;

export const getVisibleNotes = createSelector( // eslint-disable-line
  [getFilter, getNotes],
  (filter = '', notes) =>
    filterContent(filter, notes)
);
