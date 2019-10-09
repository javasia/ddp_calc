import { generalErrorTypes, fileDataErrorTypes } from '../constants/validation/errorTypes';
import currencies from '../constants/currencies';

const validators = {
  validateEmpty0: field => (!field || !field.length ? generalErrorTypes.NOT_EMPTY0 : null),
  validateEmpty5: field => (field.length < 5 ? generalErrorTypes.NOT_EMPTY5 : null),
  validateLonger30: field => (field.length >= 30 ? generalErrorTypes.NOT_LONGER30 : null),
  validateEmpty10: field => (field.length < 10 ? generalErrorTypes.NOT_EMPTY10 : null),
  validateNotNumber: field => Number.isNaN(
    Number.parseFloat(field) ? generalErrorTypes.NOT_A_NUMBER : null,
  ),
  validateIsNegativeOrZero: field => (field <= 0 ? generalErrorTypes.IS_NEGATIVE_OR_ZERO : null),
  validateRadioNotSelected: field => (field === '' ? generalErrorTypes.RADIO_NOT_SELECTED : null),
  validateFileNotProvided: field => (field === '' ? generalErrorTypes.FILE_NOT_PROVIDED : null),
  validateWrongDataFormat: ({ data, cols }) => {
    const headers = [
      'Item code',
      'Item Description',
      'U.M.',
      'Quantity, U.M.',
      'Price per U.M.',
      'Currency',
      'Gross Weight, kg',
      'Volume, CBM',
      'Duty tariff, %',
    ];
    if (cols.length !== 9) {
      return fileDataErrorTypes.WRONG_COL_NUMBER;
    }
    if (!(data.length >= 2 && data[1].length > 0)) {
      return fileDataErrorTypes.AT_LEAST_ONE_PRODUCT;
    }
    if ([...data].some(line => ![...line].every(cell => !!cell))) {
      return fileDataErrorTypes.NO_EMPTY_CELLS;
    }
    if (data[0].some((header, idx) => header !== headers[idx])) {
      return fileDataErrorTypes.WRONG_HEADER;
    }
    const permittedCurrencies = Object.values(currencies).map(({ name }) => name);
    if ([...data].some((line, idx) => !permittedCurrencies.includes(line[5]) && idx)) {
      return fileDataErrorTypes.WRONG_CURRENCY;
    }
    return null;
  },
};

export default validators;
