export const LOAD_PEOPLE = 'EVTX:SERVER:PEOPLE:LOAD';
export const PEOPLE_LOADED = 'PEOPLE:LOADED';

export const loadPeople = () => ({
  type: LOAD_PEOPLE,
  replyTo: PEOPLE_LOADED,
});

export default { loadPeople };
