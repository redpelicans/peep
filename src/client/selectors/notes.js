import R from 'ramda';
import { createSelector } from 'reselect';

const regexp = filter => new RegExp(filter, 'i');
const match = (filter, content) => R.match(filter, content).length;

const sortByProp = prop => R.sortBy(R.compose(R.ifElse(R.is(String), R.toLower, R.identity), R.prop(prop)));
const sortByOrder = order => (order === 'desc') ? R.reverse : R.identity;

const doSort = ({ by, order }) => ((by && by.length) ? R.compose(sortByOrder(order), sortByProp(by)) : R.identity);
const doFilter = (filter, notes) => R.filter(note => match(regexp(filter), note.content), notes);

const filterAndSort = (filter, sort, notes) => doFilter(filter ,doSort(sort)(notes));

const getFilter = state => state.notes.filter;
const getNotes = state => state.notes.data;
const getSort = state => state.notes.sort;
const getPeople = state => state.people.data;

export const getVisibleNotes = createSelector( // eslint-disable-line
  [getFilter,getSort, getNotes],
  (filter = '', sort = { by: '', order: '' }, notes) =>
    filterAndSort(filter, sort, notes)
);

const idToKey = R.reduce((accu, value) => ({ ...accu, [value._id]: value }), {});

export const getNotesObject = createSelector (
  [getNotes],
  (notes) =>
  idToKey(notes)
);

const checkType = person => (person.type === 'worker');
const findWorker = R.filter(checkType);

export const getWorkers = createSelector (
  [getPeople],
  (people) =>
  findWorker(people)
)