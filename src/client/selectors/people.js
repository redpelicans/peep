import R from 'ramda';
import { createSelector } from 'reselect';

const doSort = R.sortBy(R.prop('name'));
const regexp = filter => new RegExp(filter, 'i');
const getTagsPredicate = filter => ({ tags = [] }) => R.match(regexp(filter.slice(1)), tags.join(' ')).length;
const getNamePredicate = filter => ({ name }) => R.match(regexp(filter), name).length;
const getPreferredPredicate = filter => ({ preferred }) => !filter || !!preferred === !!filter;
const getPredicate = filter => filter[0] === '#' ? getTagsPredicate(filter) : getNamePredicate(filter);
const getPredicates = filter => R.compose(R.map(getPredicate), R.split(' '))(filter);
const doFilter = (filter, preferredFilter) => R.filter(R.allPass([getPreferredPredicate(preferredFilter), ...getPredicates(filter)]));
const filterAndSort = (filter, preferredFilter, people) => R.compose(doSort, doFilter(filter, preferredFilter), R.values)(people);
const getFilter = state => state.people.filter;
const getPreferredFilter = state => state.people.preferredFilter;
const getPeople = state => state.people.data;

export const getVisiblePeople = createSelector(
  [getFilter, getPreferredFilter, getPeople],
  (filter = '', preferredFilter, people) => filterAndSort(filter, preferredFilter, people),
);
