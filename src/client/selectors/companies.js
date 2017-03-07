import R from 'ramda';
import { createSelector } from 'reselect';

const doSort = R.sortBy(R.prop('name'));
const regexp = filter => new RegExp(filter, 'i');
const getTagsPredicate = filter => ({ tags = [] }) => R.match(regexp(filter.slice(1)), tags.join(' ')).length;
const getNamePredicate = filter => ({ name }) => R.match(regexp(filter), name).length;
const getPredicate = filter => filter[0] === '#' ? getTagsPredicate(filter) : getNamePredicate(filter);
const getPredicates = filter => R.compose(R.map(getPredicate), R.split(' '))(filter);
const getPreferredPredicate = filter => ({ preferred }) => !filter || !!preferred === !!filter;
const doFilter = (filter, preferredFilter) => R.filter(R.allPass([getPreferredPredicate(preferredFilter), ...getPredicates(filter)]));
const filterAndSort = (filter, preferredFilter, companies) => R.compose(doSort, doFilter(filter, preferredFilter), R.values)(companies);
const getFilter = state => state.companies.filter;
const getPreferredFilter = state => state.companies.preferredFilter;
const getCompanies = state => state.companies.data;

export const getVisibleCompanies = createSelector(
  [getFilter, getPreferredFilter, getCompanies],
  (filter = '', preferredFilter, companies) => filterAndSort(filter, preferredFilter, companies),
);
