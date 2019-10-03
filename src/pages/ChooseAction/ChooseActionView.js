import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CheckPersistedCalculations from './CheckPersistedCalculations';
import BareTextInput from '../../components/AppInputs/BareTextInput';
import Footer from '../../components/AppStepper/Footer';
import { setCalculationName, calculationNameSelector } from '../../store/reducers/data';
import ErrorLabel from '../../components/ErrorLabel';
import validators from '../../utils/validators';

const mapDispatchToProps = ({
  dispatchCalculationName: setCalculationName,
});

const mapStateToProps = state => ({
  calculationName: calculationNameSelector(state),
});


function ChooseActionView(props) {
  const { footerProps, dispatchCalculationName, calculationName } = props;
  const [errorLabels, setErrorLabels] = useState({});

  function validate() {
    const { validateEmpty10 } = validators;
    const newErrorLabels = {
      calculationName: validateEmpty10(calculationName),
    };
    setErrorLabels(newErrorLabels);
    return Object.values(newErrorLabels).every(errorType => !!errorType === false);
  }

  function handleChange(e) {
    dispatchCalculationName(e.target.value);
  }

  return (
    <>
      <CheckPersistedCalculations />
      <div className="frame-holder">
        <h1 className="frame-header">Create new calculation:</h1>
        <div style={{ marginLeft: '1em' }}>
          <BareTextInput
            style={{ width: '100%' }}
            placeholder="Please enter the name of calculation (i.e. New Calculation for John)"
            handleChange={handleChange}
            value={calculationName}
            required
          />
          { errorLabels.calculationName && <ErrorLabel errorType={errorLabels.calculationName} /> }
        </div>
      </div>
      <Footer {...footerProps} validate={validate} />
    </>
  );
}

ChooseActionView.defaultProps = {
  calculationName: '',
};

ChooseActionView.propTypes = {
  footerProps: PropTypes.shape({
    handleBack: PropTypes.func.isRequired,
    handleNext: PropTypes.func.isRequired,
    handleSkip: PropTypes.func.isRequired,
    isStepOptional: PropTypes.bool.isRequired,
    isLastStep: PropTypes.bool.isRequired,
    stepContent: PropTypes.string.isRequired,
    isBackButtonDisabled: PropTypes.bool,
  }).isRequired,
  dispatchCalculationName: PropTypes.func.isRequired,
  calculationName: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChooseActionView);
