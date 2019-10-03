import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SimpleSelect from '../../components/AppInputs/SimpleSelect/SimpleSelect';
import Footer from '../../components/AppStepper/Footer';
import CURRENCIES from '../../constants/currencies';
import { setAmount, setCurrency, templateSelector } from '../../store/reducers/statesOfExpenses';
import ExpensesAmountDateLine from './ExpensesAmountDateLine';
import ErrorLabel from '../../components/ErrorLabel';
import validators from '../../utils/validators';

const mapStateToProps = state => ({
  template: templateSelector(state),
});

const mapDispatchToProps = ({
  dispatchSetCurrency: setCurrency,
  dispatchSetAmount: setAmount,
});

function EditPaymentDates(props) {
  const [errorLabels, setErrorLabels] = useState({
    amount: [],
    currency: [],
  });
  const {
    footerProps,
    dispatchSetCurrency,
    dispatchSetAmount,
    template,
  } = props;

  function handleChangeCurrency(event, index) {
    dispatchSetCurrency({ index, currency: event.target.value });
  }

  function handleChangeDate(event, index) {
    // dispatchSetCurrency({ index, currency: event.target.value });
    console.log(event.target.value);
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

  return (
    <div className="frame-holder">
      <h1 className="frame-header">Edit payment dates:</h1>
      <Grid container spacing={3} style={{ marginBottom: '3em' }}>
        {
          template.map(({ name, currency, amount }, idx) => (
            <Grid item xs={6} key={`${name}grid`}>
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
              { errorLabels.currency[idx] && <ErrorLabel errorType={errorLabels.currency[idx]} /> }
              <ExpensesAmountDateLine
                handleChangeDate={handleChangeDate}
                key={`${name}EADL`}
                handleChangeAmount={event => handleChangeAmount(event, idx)}
                amount={amount}
              />
              { errorLabels.amount[idx] && <ErrorLabel errorType={errorLabels.amount[idx]} /> }
            </Grid>
          ))
        }
      </Grid>
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
