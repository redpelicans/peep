import { combineReducers } from 'redux';
import tags from './tags';
import companies from './companies';
import message from './message';

export default combineReducers({
  tags,
  companies,
  message,
});
