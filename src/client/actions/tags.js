export const LOAD_TAGS = 'EVTX:SERVER:TAGS:LOAD';
export const TAGS_LOADED = 'TAGS:LOADED';

export const loadTags = () => ({
  type: LOAD_TAGS,
  replyTo: TAGS_LOADED,
});

export default {
  loadTags,
};
