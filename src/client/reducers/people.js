import R from 'ramda';
import moment from 'moment';
import {
  PEOPLE_LOADED,
} from '../actions/people';


const make = (person) => {
  const updatedPerson = { ...person, typeName: 'person', createdAt: moment(person.createdAt) };
  if (person.updatedAt) updatedPerson.updatedAt = moment(person.updatedAt);
  return updatedPerson;
};

const makeAll = R.compose(R.fromPairs, R.map(o => [o._id, make(o)]));

const people = (state = { data: { } }, action) => {
  switch (action.type) {
    case PEOPLE_LOADED:
      return { ...state, data: makeAll(action.payload) };
    default:
      return state;
  }
};

export default people;
