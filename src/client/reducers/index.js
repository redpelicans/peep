import { combineReducers } from 'redux';
import tags from './tags';
import companies from './companies';

export default combineReducers({
  tags,
  companies,
});
