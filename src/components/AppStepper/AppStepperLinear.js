import React, { useState, useEffect, useCallback } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import { STEPS as steps, RESULT } from '../../constants/steps';
import Button from '../AppButtons/ButtonMUIWithRouter';
import useStyles from './style';


function getStepsLabels() {
  return steps.map(step => step.label);
}

function getStepContent(stepNumber) {
  return steps[stepNumber].message;
}

function HorizontalLinearStepper(props) {
  const { match, history } = props;
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const stepsLabels = getStepsLabels();

  const getStepPath = useCallback((stepNumber = activeStep) => `${match.path}/${steps[stepNumber].path}`, [activeStep, match.path]);

  const RESET_PATH = `${match.path}/${steps[0].path}`;
  const RESULT_PATH = `${match.path}/${RESULT.path}`;
  const { location: { pathname: locationPathname } } = window;

  useEffect(() => {
    const isResultPath = () => locationPathname === RESULT_PATH;
    const isPathnameMatchStep = () => locationPathname === getStepPath();
    if (!isResultPath() && !isPathnameMatchStep()) {
      history.push(RESET_PATH);
      setActiveStep(() => 0);
    }
  }, [locationPathname, RESET_PATH, RESULT_PATH, getStepPath, history]);

  function isLastStep(stepNumber) {
    return stepNumber === steps.length - 1;
  }

  function isStepOptional(stepNumber) {
    return !!steps[stepNumber].optional;
  }

  function isStepSkipped(stepNumber) {
    return skipped.has(stepNumber);
  }

  function getNextUrl() {
    return isLastStep(activeStep) ? RESULT_PATH : getStepPath(activeStep + 1);
  }

  function getBackUrl() {
    return steps[activeStep - 1].path;
  }
  function handleNext() {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(newSkipped);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  function handleSkip() {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  }

  function handleReset() {
    setActiveStep(0);
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {stepsLabels.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = <Typography variant="caption">Optional</Typography>;
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      <Switch>
        {steps.map(step => (
          <Route key={step.path} path={`${match.path}/${step.path}`} component={step.component} />
        ))}
        <Route key={RESULT_PATH} path={RESULT_PATH} component={RESULT.component} />
        <Route key={RESET_PATH} exact path={RESET_PATH} component={steps[0].component} />
      </Switch>

      <div className={classes.footer}>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button} url={RESET_PATH}>
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
                  url={getBackUrl()}
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
                  url={getNextUrl()}
                >
                  Skip
                </Button>
                )
              }
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
                url={getNextUrl()}
              >
                {isLastStep(activeStep) ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

HorizontalLinearStepper.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      path: PropTypes.node,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(props => HorizontalLinearStepper(props));
