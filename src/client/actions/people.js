import moment from 'moment';
import R from 'ramda';

export const LOAD_PEOPLE = 'EvtX:Server:people:load';
export const PEOPLE_LOADED = 'people:loaded';

export const loadPeople = () => ({
  type: LOAD_PEOPLE,
  replyTo: PEOPLE_LOADED,
});

export const makeAll = R.map(make);
export const make = (person) => {
  const updatedPerson = { 
    ...person, 
    typeName: 'person',
    createdAt: moment(person.createdAt),
  };
  if (person.updatedAt) updatedPerson.updatedAt = moment(person.updatedAt);
  return updatedPerson;
}

export default { loadPeople };
