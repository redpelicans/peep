import R from 'ramda';
import { createSelector } from 'reselect';

/* sorting */
const sortByProp = prop => R.sortBy(R.compose(R.ifElse(R.is(String), R.toLower, R.identity), R.prop(prop)));
const sortByOrder = order => (order === 'desc') ? R.reverse : R.identity;
const doSort = ({ by, order }) => ((by && by.length) ? R.compose(sortByOrder(order), sortByProp(by)) : R.identity);

/* filtering */
const regexp = filter => new RegExp(filter, 'i');
const getTagsPredicate = filter => ({ tags = [] }) => R.match(regexp(filter.slice(1)), tags.join(' ')).length;
const getNamePredicate = filter => ({ name }) => R.match(regexp(filter), name).length;
const getPredicate = filter => (filter[0] === '#' ? getTagsPredicate(filter) : getNamePredicate(filter));
const getPredicates = filter => R.compose(R.map(getPredicate), R.split(' '))(filter);
const getPreferredPredicate = filter => ({ preferred }) => !filter || !!preferred === !!filter;
const doFilter = (filter, preferredFilter) => R.filter(R.allPass([getPreferredPredicate(preferredFilter), ...getPredicates(filter)]));

const filterAndSort = (filter, sort, preferredFilter, companies) =>
  R.compose(doSort(sort), doFilter(filter, preferredFilter), R.values)(companies);

/* input selectors */
const getFilter = state => state.companies.filter;
const getSort = state => state.companies.sort;
const getPreferredFilter = state => state.companies.preferredFilter;
const getCompanies = state => state.companies.data;

export const getVisibleCompanies = createSelector( // eslint-disable-line
  [getFilter, getSort, getPreferredFilter, getCompanies],
  (filter = '', sort = { by: '', order: '' }, preferredFilter, companies) =>
    filterAndSort(filter, sort, preferredFilter, companies)
);
