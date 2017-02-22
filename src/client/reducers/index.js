import { combineReducers } from 'redux';


const fake = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default combineReducers({ fake });
