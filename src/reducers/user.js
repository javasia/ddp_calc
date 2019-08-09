import { handleActions, createAction } from 'redux-actions';
import {defUser} from '../Mock';

//TYPES
export const SET_USER_DATA = 'USER/SET_USER_DATA';
export const LOGOUT = 'USER/LOGOUT';

export const REDUCER_NAME = 'user';

//ACTION CREATORS
export const setUserData = createAction(SET_USER_DATA);
export const logout = createAction(LOGOUT);

const initialState = { isAuthorized: false };

export default handleActions({
  [setUserData]: (state, {payload: {email, password}}) => ({
    ...state,
    email,
    password, 
    isAuthorized: defUser.email === email && defUser.password === password,
  }),
  [logout]: () => initialState,
}, initialState);

export const userSelector = state => state[REDUCER_NAME];
