import debug from 'debug';
import { Note } from '../models';

const loginfo = debug('peep:evtx');
const SERVICE_NAME = 'notes';

export const notes = {
  load() {
    return Note.loadAll();
  },
};

const init = (evtx) => {
  evtx.use(SERVICE_NAME, notes);
  loginfo('notes service registered');
};

export default init;
