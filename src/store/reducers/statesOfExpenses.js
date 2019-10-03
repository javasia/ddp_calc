import { handleActions, createAction } from 'redux-actions';
import { createSelector } from 'reselect';
import DEFAULT_TEMPLATE from '../../constants/defaultTemplate';
import DEFAULT_CRITERIA from '../../constants/criteriaOfDistribution';

const criteriaOfDistribution = { ...DEFAULT_CRITERIA };

// TYPES
export const ADD_STATE_OF_EXPENSES = 'STATES_OF_EXPENSES/ADD_STATE_OF_EXPENSES';
export const SET_NAME = 'STATES_OF_EXPENSES/SET_NAME';
export const SET_CRITERION = 'STATES_OF_EXPENSES/SET_CRITERION';
export const DELETE_STATE_OF_EXPENSES = 'STATES_OF_EXPENSES/DELETE_STATE_OF_EXPENSES';
export const RESET_TEMPLATE = 'STATES_OF_EXPENSES/RESET_TEMPLATE';
export const SET_CURRENCY = 'STATES_OF_EXPENSES/SET_CURRENCY';
export const SET_AMOUNT = 'STATES_OF_EXPENSES/SET_AMOUNT';
export const SET_EXCHANGE_RATE = 'STATES_OF_EXPENSES/SET_EXCHANGE_RATE';

export const REDUCER_NAME = 'statesOfExpenses';

// ACTION CREATORS
export const addStateOfExpenses = createAction(ADD_STATE_OF_EXPENSES);
export const setName = createAction(SET_NAME);
export const setCriterion = createAction(SET_CRITERION);
export const deleteStateOfExpenses = createAction(DELETE_STATE_OF_EXPENSES);
export const resetTemplate = createAction(RESET_TEMPLATE);
export const setCurrency = createAction(SET_CURRENCY);
export const setAmount = createAction(SET_AMOUNT);
export const setExchangeRate = createAction(SET_EXCHANGE_RATE);

const initialState = [
  ...DEFAULT_TEMPLATE,
];

export default handleActions({
  [addStateOfExpenses]: (state, { payload: stateOfExpenses }) => ([
    ...state,
    stateOfExpenses,
  ]),
  [deleteStateOfExpenses]: (state, { payload: index }) => ([
    ...state.slice(0, index),
    ...state.slice(index + 1),
  ]),
  [setName]: (state, { payload: { index, name } }) => ([
    ...state.slice(0, index),
    {
      ...state[index],
      name,
    },
    ...state.slice(index + 1),
  ]),
  [setCriterion]: (state, { payload: { index, criterion } }) => ([
    ...state.slice(0, index),
    {
      ...state[index],
      criterion: { ...criteriaOfDistribution[criterion] },
    },
    ...state.slice(index + 1),
  ]),
  [setCurrency]: (state, { payload: { index, currency } }) => ([
    ...state.slice(0, index),
    {
      ...state[index],
      currency,
    },
    ...state.slice(index + 1),
  ]),
  [setAmount]: (state, { payload: { index, amount } }) => ([
    ...state.slice(0, index),
    {
      ...state[index],
      amount,
    },
    ...state.slice(index + 1),
  ]),
  [setExchangeRate]: (state, { payload: { index, exchangeRate } }) => ([
    ...state.slice(0, index),
    {
      ...state[index],
      exchangeRate,
    },
    ...state.slice(index + 1),
  ]),
  [resetTemplate]: () => ({
    ...initialState,
  }),
}, initialState);

const statesOfExpensesReducer = state => state[REDUCER_NAME];

export const templateSelector = createSelector(
  statesOfExpensesReducer,
  expenses => expenses,
);
