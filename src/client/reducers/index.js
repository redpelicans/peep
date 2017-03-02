import { combineReducers } from 'redux';
import tags from './tags';
import companies from './companies';
import message from './message';
import cities from './cities';
import countries from './countries';

export default combineReducers({
  tags,
  companies,
  message,
  countries,
  cities,
});
