import R from 'ramda';

export const LOAD_PEOPLE = 'EvtX:Server:people:load';
export const PEOPLE_LOADED = 'people:loaded';
export const ADD_PEOPLE = 'EvtX:Server:people:add';
export const PEOPLE_ADDED = 'people:added';
export const PEOPLE_UPDATED = 'people:updated';
export const SET_PREFERRED_PEOPLE = 'EvtX:Server:people:setPreferred';
export const CHECK_EMAIL = 'EvtX:Server:people:checkEmailUniqueness';
export const TOGGLE_PREFERRED_FILTER = 'toggle:preferred:people';
export const FILTER_PEOPLE_LIST = 'filter:people:list';

export const loadPeople = () => (dispatch, getState) => {
  const { people } = getState();
  if (R.isEmpty(people.data)) {
    dispatch({
      type: LOAD_PEOPLE,
      replyTo: PEOPLE_LOADED,
    });
  }
};

export const addPeople = people => (dispatch) => {
  dispatch({
    type: ADD_PEOPLE,
    payload: people,
    replyTo: PEOPLE_ADDED,
  });
};

export const checkEmail = (email, cb) => ({
  type: CHECK_EMAIL,
  callback: cb,
  payload: email,
});

export const onPreferredClick = person => (dispatch) => {
  const { _id, preferred } = person;
  console.log('_id: ', _id);
  dispatch({
    type: SET_PREFERRED_PEOPLE,
    replyTo: PEOPLE_UPDATED,
    payload: { _id, preferred: !preferred },
  });
};

export const togglePreferredFilter = () => ({ type: TOGGLE_PREFERRED_FILTER });

export const onTagClick = filter => ({
  type: FILTER_PEOPLE_LIST,
  filter,
});

export default { loadPeople };
