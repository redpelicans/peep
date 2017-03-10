import R from 'ramda';
import moment from 'moment';

export const LOAD_PEOPLE = 'EvtX:Server:people:load';
export const PEOPLE_LOADED = 'people:loaded';
export const ADD_PEOPLE = 'EvtX:Server:people:add';
export const PEOPLE_ADDED = 'people:added';
export const PEOPLE_UPDATED = 'people:updated';
export const SET_PREFERRED_PEOPLE = 'EvtX:Server:people:setPreferred';
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

export const togglePreferred = person => (dispatch) => {
  const { _id, preferred } = person;
  dispatch({
    type: SET_PREFERRED_PEOPLE,
    replyTo: PEOPLE_UPDATED,
    payload: { _id, preferred: !preferred },
  });
};

export const togglePreferredFilter = () => ({ type: TOGGLE_PREFERRED_FILTER });

export const filterPeopleList = filter => ({
  type: FILTER_PEOPLE_LIST,
  filter,
});

export const make = (person) => {
  const updatedPerson = {
    ...person,
    typeName: 'person',
    createdAt: moment(person.createdAt),
  };
  if (person.updatedAt) updatedPerson.updatedAt = moment(person.updatedAt);
  return updatedPerson;
};

export const makeAll = R.map(make);

export default { loadPeople };
