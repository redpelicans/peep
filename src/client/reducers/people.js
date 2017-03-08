import R from 'ramda';
import moment from 'moment';
import {
  PEOPLE_LOADED,
  FILTER_PEOPLE_LIST,
  TOGGLE_PREFERRED_FILTER,
  } from '../actions/people';

const make = (person) => {
  const updatedPerson = { ...person, typeName: 'person', createdAt: moment(person.createdAt) };
  if (person.updatedAt) updatedPerson.updatedAt = moment(person.updatedAt);
  return updatedPerson;
};

const makeAll = R.compose(R.fromPairs, R.map(o => [o._id, make(o)]));

const people = (state = { data: { } }, action) => {
  switch (action.type) {
    case TOGGLE_PREFERRED_FILTER:
      return { ...state, preferredFilter: !state.preferredFilter };
    case FILTER_PEOPLE_LIST:
      return { ...state, filter: action.filter };
    case PEOPLE_LOADED:
      return { ...state, data: makeAll(action.payload) };
    default:
      return state;
  }
};

export default people;
