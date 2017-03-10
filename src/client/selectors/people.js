import R from 'ramda';
import { createSelector } from 'reselect';

const getFilter = state => state.people.filter;
const getPreferredFilter = state => state.people.preferredFilter;
const getPeople = state => state.people.data;
const getCompanies = state => state.companies.data;

const doSort = R.sortBy(R.prop('name'));
const regexp = filter => new RegExp(filter, 'i');
const getTagsPredicate = filter => ({ tags = [] }) => R.match(regexp(filter.slice(1)), tags.join(' ')).length;
const getNamePredicate = filter => ({ name, companyName }) => {
  const matchName = R.match(regexp(filter), name);
  const matchCompanyName = (companyName && companyName.length > 0) ? R.match(regexp(filter), companyName) : [];
  return R.concat(matchName, matchCompanyName).length;
};
const getPreferredPredicate = filter => ({ preferred }) => !filter || !!preferred === !!filter;
const getPredicate = filter => filter[0] === '#' ? getTagsPredicate(filter) : getNamePredicate(filter);
const getPredicates = filter => R.compose(R.map(getPredicate), R.split(' '))(filter);
const doFilter = (filter, preferredFilter) => R.filter(R.allPass([getPreferredPredicate(preferredFilter), ...getPredicates(filter)]));
const filterAndSort = (filter, preferredFilter, people) => R.compose(doSort, doFilter(filter, preferredFilter), R.values)(people);

const matchNameAndCompany = (companyId, companies) => ((companies[companyId]) ? companies[companyId].name : null);

export const getVisiblePeople = createSelector(
  [getFilter, getPreferredFilter, getPeople, getCompanies],
  (filter = '', preferredFilter, people, companies) => {
    const peopleWithCompanyName = R.mapObjIndexed((person) => {
      return { ...person, companyName: matchNameAndCompany(person.companyId, companies) };
    }, people);
    return filterAndSort(filter, preferredFilter, peopleWithCompanyName);
  }
);
