import R from 'ramda';

export const LOAD_TAGS = 'EvtX:Server:tags:load';
export const TAGS_LOADED = 'tags:loaded';
export const FILTER_TAGS = 'filter:tags';

export const loadTags = () => (dispatch, getState) => {
  const { tags } = getState();
  if (R.isEmpty(tags.data)) {
    dispatch({
      type: LOAD_TAGS,
      replyTo: TAGS_LOADED,
    });
  }
};

export const filterTags = filter => ({ type: FILTER_TAGS, filter });

