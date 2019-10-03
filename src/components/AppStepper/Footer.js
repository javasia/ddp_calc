import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { setDataReady } from '../../store/reducers/data';
import useStyles from './style';

const mapDispatchToProps = ({
  dispatchDataReady: setDataReady,
});

function Footer({
  handleBack,
  handleNext,
  handleSkip,
  isStepOptional,
  isLastStep,
  validate,
  reset,
  dispatchDataReady,
  stepContent,
  isBackButtonDisabled,
}) {
  function handleClickNext() {
    const isValidInput = validate();
    dispatchDataReady(isLastStep && isValidInput);
    if (isValidInput) {
      handleNext();
    }
  }

  function handleClickSkip() {
    reset();
    handleSkip();
  }

  const classes = useStyles();

  return (
    <div className={classes.footer}>
      <div>
        <Typography className={classes.instructions}>{stepContent}</Typography>
        <div>
          <Button
            onClick={handleBack}
            className={classes.button}
            disabled={isBackButtonDisabled}
          >
            Back
          </Button>
          {
            isStepOptional && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleClickSkip}
                className={classes.button}
              >
                Skip (Reset)
              </Button>
            )
          }
          <Button
            variant="contained"
            color="primary"
            onClick={handleClickNext}
            className={classes.button}
          >
            {isLastStep ? 'Finish' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
}

Footer.defaultProps = {
  isBackButtonDisabled: true,
  reset: () => null,
};

Footer.propTypes = {
  handleBack: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleSkip: PropTypes.func.isRequired,
  isStepOptional: PropTypes.bool.isRequired,
  isLastStep: PropTypes.bool.isRequired,
  validate: PropTypes.func.isRequired,
  reset: PropTypes.func,
  dispatchDataReady: PropTypes.func.isRequired,
  stepContent: PropTypes.string.isRequired,
  isBackButtonDisabled: PropTypes.bool,
};

export default connect(null, mapDispatchToProps)(Footer);
