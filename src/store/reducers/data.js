import { handleActions, createAction } from 'redux-actions';
import { createSelector } from 'reselect';

// TYPES
export const SET_CALCULATION_NAME = 'DATA/SET_CALCULATION_NAME';

export const REDUCER_NAME = 'data';

// ACTION CREATORS
export const setCalculationName = createAction(SET_CALCULATION_NAME);

const initialState = {
  calculationName: '',
};

export default handleActions({
  [setCalculationName]: (state, { payload: calculationName }) => ({
    ...state,
    calculationName,
  }),
}, initialState);

const dataReducer = state => state[REDUCER_NAME];
export const calculationNameSelector = createSelector(
  dataReducer,
  data => data.calculationName,
);
