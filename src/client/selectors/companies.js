import R from 'ramda';
import { createSelector } from 'reselect';

const doSort = R.sortBy(R.prop('name'));
const filterRegexp = filter => new RegExp(filter, 'i');
const doFilter = (filter) => R.filter(({ name }) => R.match(filterRegexp(filter), name).length); 
const filterAndSort = (filter, companies) => R.compose(doSort, doFilter(filter), R.values)(companies);
const getFilter = state => state.companies.filter;
const getCompanies = state => state.companies.data;

export const getVisibleCompanies = createSelector(
  [getFilter, getCompanies],
  (filter, companies) => filterAndSort(filter, companies),
);
