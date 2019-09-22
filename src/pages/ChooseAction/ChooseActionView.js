import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CheckPersistedCalculations from './CheckPersistedCalculations';
import BareTextInput from '../../components/AppInputs/BareTextInput';
import Footer from '../../components/AppStepper/Footer';
import { setCalculationName } from '../../store/reducers/data';
import './style.css';


const mapDispatchToProps = ({
  dispatchCalculationName: setCalculationName,
});

const mapStateToProps = ({ data: { calculationName } }) => ({
  calculationName,
});


function ChooseActionView(props) {
  const { footerProps, dispatchCalculationName, calculationName } = props;
  const [calculationNameError, setCalculationNameError] = useState('');

  function validate() {
    if (!calculationName.length || calculationName.length < 10) {
      setCalculationNameError('Error: field must have at least 10 symbols');
      return false;
    }
    return true;
  }

  function handleChange(e) {
    dispatchCalculationName(e.target.value);
  }

  return (
    <>
      <CheckPersistedCalculations />
      <div className="frame-holder">
        <h1 className="frame-header">Create new calculation:</h1>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <BareTextInput
            style={{ width: '100%' }}
            placeholder="Please enter the name of calculation (i.e. New Calculation for John)"
            handleChange={handleChange}
            value={calculationName}
            required
          />
          { calculationNameError && <span className="error">{calculationNameError}</span> }
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
    activeStep: PropTypes.number.isRequired,
    steps: PropTypes.arrayOf(PropTypes.shape({
      message: PropTypes.string.isRequired,
    })).isRequired,
    handleReset: PropTypes.func.isRequired,
    handleBack: PropTypes.func.isRequired,
    handleNext: PropTypes.func.isRequired,
    handleSkip: PropTypes.func.isRequired,
    isStepOptional: PropTypes.func.isRequired,
    isLastStep: PropTypes.func.isRequired,
}).isRequired,
  dispatchCalculationName: PropTypes.func.isRequired,
  calculationName: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChooseActionView);
