export const LOAD_PEOPLE = 'EvtX:Server:people:load';
export const PEOPLE_LOADED = 'people:loaded';
export const PEOPLE_UPDATE = 'people:updated';
export const SET_PREFERRED_PEOPLE = 'EvtX:Server:people:setPreferred';

export const loadPeople = () => ({
  type: LOAD_PEOPLE,
  replyTo: PEOPLE_LOADED,
});

export const togglePreferred = person => (dispatch) => {
  const { _id, preferred } = person;
  dispatch({
    type: SET_PREFERRED_PEOPLE,
    replyTo: PEOPLE_UPDATE,
    payload: { _id, preferred: !preferred },
  });
};

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
