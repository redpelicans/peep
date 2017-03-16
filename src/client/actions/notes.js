export const LOAD_NOTES = 'EvtX:Server:notes:load';
export const UPDATE_NOTE = 'EvtX:Server:notes:update';
export const NOTES_LOADED = 'notes:loaded';
export const FILTER_NOTES_LIST = 'filter:notes:list';
export const SORT_NOTES_LIST = 'sort:notes:list';
export const NOTE_UPDATED = 'notes:updated';

export const filterNotesList = filter => ({
  type: FILTER_NOTES_LIST,
  filter,
});

export const sortNotesList = sortBy => ({
  type: SORT_NOTES_LIST,
  sortBy,
});

export const updateNote = note => (dispatch) => {
  dispatch({
    type: UPDATE_NOTE,
    payload: note,
    replyTo: NOTE_UPDATED,
  });
};

export const loadNotes = () => (dispatch, getState) => {
  const { notes } = getState();
  if (!notes.data.length) {
    dispatch({
      type: LOAD_NOTES,
      replyTo: NOTES_LOADED,
    });
  }
};
