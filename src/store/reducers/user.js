import { handleActions, createAction } from 'redux-actions';
import { createSelector } from 'reselect';
import { defUser } from '../../mock';


// TYPES
export const SET_USER_DATA = 'USER/SET_USER_DATA';
export const LOGOUT = 'USER/LOGOUT';

export const REDUCER_NAME = 'user';

// ACTION CREATORS
export const setUserData = createAction(SET_USER_DATA);
export const dispatchLogout = createAction(LOGOUT);

const initialState = { isAuthorized: true }; // just a temporary mock
// const initialState = { isAuthorized: false };

export default handleActions({
  [setUserData]: (state, { payload: { email, password } }) => ({
    ...state,
    email,
    password,
    isAuthorized: defUser.email === email && defUser.password === password,
  }),
  [dispatchLogout]: () => initialState,
}, initialState);

const userReducer = state => state[REDUCER_NAME];
export const userAuthSelector = createSelector(
  userReducer,
  user => user.isAuthorized,
);
