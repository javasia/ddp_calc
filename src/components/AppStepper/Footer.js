import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import useStyles from './style';

function Footer({
  activeStep,
  steps,
  handleReset,
  handleBack,
  handleNext,
  handleSkip,
  isStepOptional,
  isLastStep,
  validate,
}) {
  function getStepContent(stepNumber) {
    return steps[stepNumber].message;
  }

  function handleClickNext() {
    const isValidInput = validate();
    if (isValidInput) {
      handleNext();
    }
  }

  const classes = useStyles();

  return (
    <div className={classes.footer}>
      {activeStep === steps.length ? (
        <div>
          <Typography className={classes.instructions}>
            All steps completed - you&apos;re finished
          </Typography>
          <Button onClick={handleReset} className={classes.button} url="">
            Reset
          </Button>
        </div>
      ) : (
        <div>
          <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
          <div>
            {activeStep === 0 || (
              <Button
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
            )}
            {
              isStepOptional(activeStep) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                  className={classes.button}
                >
                  Skip
                </Button>
              )
            }
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickNext}
              className={classes.button}
            >
              {isLastStep(activeStep) ? 'Finish' : 'Next'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

Footer.propTypes = {
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
  validate: PropTypes.func.isRequired,
};

export default Footer;
