import React from 'react';
import PropTypes from 'prop-types';
import SimpleSelect from '../../components/AppInputs/SimpleSelect/SimpleSelect';
import CURRENCIES from '../../constants/currencies';
import ExpensesAmountDateLine from './ExpensesAmountDateLine';
import Amounts from './Amounts';

export default function EditPaymentDates(props) {
  const {
    name,
    total,
    subTotal,
    remainder,
  } = props;
  const { USD: { name: defaultValue } } = CURRENCIES;
  return (
    <div className="frame-holder">
      <h1 className="frame-header">Edit payment dates:</h1>
      <h2 className="frame-header">{name}</h2>
      <SimpleSelect
        value={defaultValue}
        name="currency"
        disabled={false}
        menuItems={CURRENCIES}
        style={{ width: '200px' }}
      />
      <ExpensesAmountDateLine />
      <Amounts
        total={total.toString()}
        subTotal={subTotal.toString()}
        remainder={remainder.toString()}
      />
    </div>
  );
}

EditPaymentDates.defaultProps = {
  name: '%Name of the state of expenses%',
  total: 99.99999,
  subTotal: 99.99999,
  remainder: 99.99999,
};

EditPaymentDates.propTypes = {
  name: PropTypes.string,
  total: PropTypes.number,
  subTotal: PropTypes.number,
  remainder: PropTypes.number,
};
