export const LOAD_PEOPLE = 'EvtX:Server:people:load';
export const PEOPLE_LOADED = 'people:loaded';

export const loadPeople = () => ({
  type: LOAD_PEOPLE,
  replyTo: PEOPLE_LOADED,
});

export default { loadPeople };
