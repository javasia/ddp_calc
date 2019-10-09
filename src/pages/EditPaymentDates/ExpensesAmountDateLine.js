import React from 'react';
import PropTypes from 'prop-types';
import BareTextInput from '../../components/AppInputs/BareTextInput';
import DateInput from '../../components/AppInputs/DateInput';


function ExpensesAmountDateLine(props) {
  const { handleChangeDate, handleChangeAmount, amount } = props;
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <BareTextInput
        placeholder="0.00"
        style={{
          marginRight: '5px',
        }}
        type="number"
        value={amount.toString()}
        handleChange={handleChangeAmount}
      />
      <DateInput
        label="Date of payment"
        style={{
          marginRight: '5px',
        }}
        handleChange={handleChangeDate}
      />
    </div>
  );
}

ExpensesAmountDateLine.defaultProps = {
  amount: 0.00,
};

ExpensesAmountDateLine.propTypes = {
  handleChangeDate: PropTypes.func.isRequired,
  handleChangeAmount: PropTypes.func.isRequired,
  amount: PropTypes.number,
};

export default ExpensesAmountDateLine;
