export const LOAD_PEOPLE = 'server/people/load';

export const loadPeople = () => (dispatch) => {
  dispatch({
    type: LOAD_PEOPLE,
  });
};
