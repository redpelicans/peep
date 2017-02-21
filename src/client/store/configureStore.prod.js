import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';
import thunk from 'redux-thunk'
import { socketIoMiddleWare } from '../middlewares';

const configureStore = (initialState, io) => createStore(
  rootReducer,
  initialState,
  applyMiddleware(socketIoMiddleWare(io), thunk, createLogger()),
);

export default configureStore;
