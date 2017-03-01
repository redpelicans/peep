import { companies } from '../components/App';

export const SORTED_BY_ASC = 'sort/sortedbyAscii';

export const sortedByAsc = companies => ({
  type: SORTED_BY_ASC,
  payload: companies,
});

export const sortByAsc = companies => (dispatch) => {
  dispatch(sortedByAsc(companies));
};

export default {
  sortByAsc,
};
