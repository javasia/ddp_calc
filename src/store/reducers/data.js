import { handleActions, createAction } from 'redux-actions';
import { createSelector } from 'reselect';

// TYPES
export const SET_CALCULATION_NAME = 'DATA/SET_CALCULATION_NAME';
export const SET_TRANSPORT_TYPE = 'DATA/SET_TRANSPORT_TYPE';
export const SET_CARGO_DATA = 'DATA/SET_CARGO_DATA';
export const SET_DATA_READY = 'DATA/READY';

export const REDUCER_NAME = 'data';

// ACTION CREATORS
export const setCalculationName = createAction(SET_CALCULATION_NAME);
export const setTransportType = createAction(SET_TRANSPORT_TYPE);
export const setCargoData = createAction(SET_CARGO_DATA);
export const setDataReady = createAction(SET_DATA_READY);

const initialState = {
  calculationName: '',
  transportType: '',
  cargoData: {
    data: [],
    cols: [],
    fileName: '',
  },
  dataReady: false,
};

export default handleActions({
  [setCalculationName]: (state, { payload: calculationName }) => ({
    ...state,
    calculationName,
  }),
  [setTransportType]: (state, { payload: transportType }) => ({
    ...state,
    transportType,
  }),
  [setCargoData]: (state, { payload: cargoData }) => ({
    ...state,
    cargoData,
  }),
  [setDataReady]: (state, { payload: dataReady }) => ({
    ...state,
    dataReady,
  }),
}, initialState);

const dataReducer = state => state[REDUCER_NAME];

export const calculationNameSelector = createSelector(
  dataReducer,
  data => data.calculationName,
);

export const transportTypeSelector = createSelector(
  dataReducer,
  data => data.transportType,
);

export const cargoDataSelector = createSelector(
  dataReducer,
  data => data.cargoData,
);

export const dataReadySelector = createSelector(
  dataReducer,
  data => data.dataReady,
);

export const cargoDataFileNameSelector = createSelector(
  dataReducer,
  ({ cargoData: { fileName } }) => fileName,
);
