import { createStore, applyMiddleware, combineReducers } from 'redux';

export const configStore = (reducers, middlewares) => {
  return createStore(combineReducers(reducers), {}, applyMiddleware(...middlewares));
};
