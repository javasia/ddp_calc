import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const configStore = (reducers, middlewares) => createStore(
  combineReducers(reducers), {}, composeWithDevTools(applyMiddleware(...middlewares)),
);

export default configStore;
