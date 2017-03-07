import R from 'ramda';
import { createSelector } from 'reselect';

const doSort = R.sortBy(R.prop('name'));
const regexp = filter => new RegExp(filter, 'i');
const getTagsPredicate = filter => ({ tags = [] }) => R.match(regexp(filter.slice(1)), tags.join(' ')).length;
const getNamePredicate = filter => ({ name }) => R.match(regexp(filter), name).length;
const getPredicate = filter => filter[0] === '#' ? getTagsPredicate(filter) : getNamePredicate(filter);
const getPredicates = filter => R.compose(R.map(getPredicate), R.split(' '))(filter);
const doFilter = filter => R.filter(R.allPass(getPredicates(filter)));
const filterAndSort = (filter, companies) => R.compose(doSort, doFilter(filter), R.values)(companies);
const getFilter = state => state.companies.filter;
const getCompanies = state => state.companies.data;

export const getVisibleCompanies = createSelector(
  [getFilter, getCompanies],
  (filter = '', companies) => filterAndSort(filter, companies),
);
