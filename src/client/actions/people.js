export const LOAD_PEOPLE = 'EVTX:SERVER:PEOPLE:LOAD';
export const PEOPLE_LOADED = 'PEOPLE:LOADED';

export const loadPeople = () => (dispatch) => {
  dispatch({
    type: LOAD_PEOPLE,
    replyTo: PEOPLE_LOADED,
  });
};
