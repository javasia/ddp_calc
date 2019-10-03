import errorTypes from './errorTypes';

const {
  generalErrorTypes: {
    NOT_EMPTY0,
    NOT_EMPTY5,
    NOT_EMPTY10,
    NOT_LONGER30,
    RADIO_NOT_SELECTED,
    FILE_NOT_PROVIDED,
    NOT_A_NUMBER,
    IS_NEGATIVE_OR_ZERO,
  },
  fileDataErrorTypes: {
    WRONG_COL_NUMBER,
    NO_EMPTY_CELLS,
    WRONG_HEADER,
    AT_LEAST_ONE_PRODUCT,
    PRICE_IS_NOT_NUMBER,
    QTY_IS_NOT_NUMBER,
    G_WEIGHT_IS_NOT_NUMBER,
    CBM_IS_NOT_NUMBER,
    CURRENCY_IS_NUMBER,
    UM_IS_NUMBER,
    WRONG_CURRENCY,
  },
} = errorTypes;

export const generalErrorMessages = {
  [NOT_EMPTY0]: 'Error: please fill the field',
  [NOT_EMPTY5]: 'Error: field must have at least 5 symbols',
  [NOT_LONGER30]: 'Error: field must have at most 30 symbols',
  [NOT_EMPTY10]: 'Error: field must have at least 10 symbols',
  [RADIO_NOT_SELECTED]: 'Error: please select an option',
  [FILE_NOT_PROVIDED]: 'Error: file must be provided',
  [NOT_A_NUMBER]: 'Error: field is not a number',
  [IS_NEGATIVE_OR_ZERO]: 'Error: field should a greater than zero',
};

export const fileDataErrorMessages = {
  [WRONG_COL_NUMBER]: `Wrong data format: ${WRONG_COL_NUMBER}`,
  [NO_EMPTY_CELLS]: `Wrong data format: ${NO_EMPTY_CELLS}`,
  [WRONG_HEADER]: `Wrong data format: ${WRONG_HEADER}`,
  [AT_LEAST_ONE_PRODUCT]: 'Wrong data format: there should be at least one product',
  [PRICE_IS_NOT_NUMBER]: `Wrong data format: ${PRICE_IS_NOT_NUMBER}`,
  [QTY_IS_NOT_NUMBER]: `Wrong data format: ${QTY_IS_NOT_NUMBER}`,
  [G_WEIGHT_IS_NOT_NUMBER]: `Wrong data format: ${G_WEIGHT_IS_NOT_NUMBER}`,
  [CBM_IS_NOT_NUMBER]: `Wrong data format: ${CBM_IS_NOT_NUMBER}`,
  [CURRENCY_IS_NUMBER]: `Wrong data format: ${CURRENCY_IS_NUMBER}`,
  [UM_IS_NUMBER]: `Wrong data format: ${UM_IS_NUMBER}`,
  [WRONG_CURRENCY]: `Wrong data format: ${WRONG_CURRENCY}`,
};

export default {
  ...generalErrorMessages,
  ...fileDataErrorMessages,
};
