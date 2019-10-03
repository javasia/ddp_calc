import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SimpleSelect from '../../components/AppInputs/SimpleSelect/SimpleSelect';
import Footer from '../../components/AppStepper/Footer';
import CURRENCIES from '../../constants/currencies';
import {
  setAmount,
  setCurrency,
  templateSelector,
  setExchangeRate,
} from '../../store/reducers/statesOfExpenses';
import ExpensesAmountDateLine from './ExpensesAmountDateLine';
import ErrorLabel from '../../components/ErrorLabel';
import validators from '../../utils/validators';
import requestExchangeRate from '../../thunks/EditPaymentDates';
import Preloader from '../../components/Preloader/Preloader';

const mapStateToProps = state => ({
  template: templateSelector(state),
});

const mapDispatchToProps = ({
  dispatchSetCurrency: setCurrency,
  dispatchSetAmount: setAmount,
  dispatchSetExchangeRate: setExchangeRate,
});

function EditPaymentDates(props) {
  const [errorLabels, setErrorLabels] = useState({
    amount: [],
    currency: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [dates, setDates] = useState([]);
  const {
    footerProps,
    dispatchSetCurrency,
    dispatchSetAmount,
    template,
    dispatchSetExchangeRate,
  } = props;

  function handleChangeCurrency(event, index) {
    dispatchSetCurrency({ index, currency: event.target.value });
  }

  function handleChangeDate(event, index) {
    const date = event.target.value.replace(/-/g, '');
    const { currency } = template[index];
    const newDates = [...dates];
    newDates[index] = event.target.value;
    requestExchangeRate(currency, date, index)(setIsLoading)(dispatchSetExchangeRate);
    setDates(newDates);
  }

  function handleChangeExchangeRate(event, index) {
    dispatchSetExchangeRate({
      index,
      exchangeRate: event.target.value,
    });
  }

  function handleChangeAmount(event, index) {
    dispatchSetAmount({ index, amount: +event.target.value });
  }

  function validate() {
    const { validateIsNegativeOrZero, validateNotNumber, validateEmpty0 } = validators;
    const newErrorLabels = {
      amount: [...template.map(({ amount }) => validateNotNumber(amount)
        || validateIsNegativeOrZero(amount))],
      currency: [...template.map(({ currency }) => validateEmpty0(currency))],
    };
    setErrorLabels(newErrorLabels);
    return Object.values(newErrorLabels).flat().every(errorMessage => !!errorMessage === false);
  }

  return isLoading ? <Preloader isVisible={isLoading} /> : (
    <div className="frame-holder">
      <h1 className="frame-header">Edit payment dates:</h1>
      {template.map(({
        name,
        currency,
        amount,
        exchangeRate,
      }, idx) => (
        <>
          <h2 className="frame-header" key={`${name}h2`}>
            {name}
          </h2>
          <SimpleSelect
            value={currency}
            name="currency"
            disabled={false}
            menuItems={CURRENCIES}
            style={{ width: '200px' }}
            handleChange={event => handleChangeCurrency(event, idx)}
            key={`${name}SimpleSelect`}
          />
          {errorLabels.currency[idx] && <ErrorLabel errorType={errorLabels.currency[idx]} />}
          <ExpensesAmountDateLine
            handleChangeDate={event => handleChangeDate(event, idx)}
            key={`${name}EADL`}
            handleChangeAmount={event => handleChangeAmount(event, idx)}
            amount={amount}
            handleChangeExchangeRate={event => handleChangeExchangeRate(event, idx)}
            exchangeRate={exchangeRate}
            date={dates[idx]}
          />
          {errorLabels.amount[idx] && <ErrorLabel key={`${name}ERR`} errorType={errorLabels.amount[idx]} />}
        </>
      ))
      }
      <Footer {...footerProps} validate={validate} />
    </div>
  );
}

EditPaymentDates.propTypes = {
  footerProps: PropTypes.shape({
    handleBack: PropTypes.func.isRequired,
    handleNext: PropTypes.func.isRequired,
    handleSkip: PropTypes.func.isRequired,
    isStepOptional: PropTypes.bool.isRequired,
    isLastStep: PropTypes.bool.isRequired,
    stepContent: PropTypes.string.isRequired,
    isBackButtonDisabled: PropTypes.bool,
  }).isRequired,
  dispatchSetCurrency: PropTypes.func.isRequired,
  dispatchSetAmount: PropTypes.func.isRequired,
  dispatchSetExchangeRate: PropTypes.func.isRequired,
  template: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    criterion: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
    currency: PropTypes.string.isRequired,
    isDefault: PropTypes.bool.isRequired,
  })).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPaymentDates);
