import { createStore, applyMiddleware, combineReducers } from 'redux';

const configStore = (reducers, middlewares) => createStore(
  combineReducers(reducers), {}, applyMiddleware(...middlewares),
);

export default configStore;
