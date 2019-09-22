import React, { useState, useEffect, useCallback } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import { STEPS as steps, RESULT } from '../../constants/steps';
import useStyles from './style';

function getStepsLabels() {
  return steps.map(step => step.label);
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

  const isStepSkipped = useCallback(
    () => skipped.has(activeStep),
    [activeStep, skipped],
  );

  const getNextUrl = useCallback(
    () => (isLastStep(activeStep) ? RESULT_PATH : getStepPath(activeStep + 1)),
    [RESULT_PATH, activeStep, getStepPath],
  );

  const getBackUrl = useCallback(
    () => steps[activeStep - 1].path,
    [activeStep],
  );

  const handleNext = useCallback(
    () => {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }

      setActiveStep(prevActiveStep => prevActiveStep + 1);
      setSkipped(newSkipped);

      history.push(getNextUrl());
    },
    [activeStep, getNextUrl, history, isStepSkipped, skipped],
  );

  const handleBack = useCallback(
    () => {
      setActiveStep(prevActiveStep => prevActiveStep - 1);
      history.push(getBackUrl());
    },
    [getBackUrl, history],
  );

  const handleSkip = useCallback(
    () => {
      if (!isStepOptional(activeStep)) {
        throw new Error("You can't skip a step that isn't optional.");
      }

      setActiveStep(prevActiveStep => prevActiveStep + 1);
      setSkipped((prevSkipped) => {
        const newSkipped = new Set(prevSkipped.values());
        newSkipped.add(activeStep);
        return newSkipped;
      });

      history.push(getNextUrl());
    },
    [activeStep, getNextUrl, history],
  );

  const handleReset = useCallback(() => setActiveStep(0), []);

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
        {steps.map(({ path, component: StepPage }) => (
          <Route
            key={path}
            path={`${match.path}/${path}`}
            // eslint-disable-next-line no-shadow
            render={props => (
              <StepPage
                {...props}
                footerProps={{
                  activeStep,
                  steps,
                  handleReset,
                  handleBack,
                  handleNext,
                  handleSkip,
                  isStepOptional,
                  isLastStep,
                }}
              />
            )}
          />
        ))}
        <Route key={RESULT_PATH} path={RESULT_PATH} component={RESULT.component} />
        <Route key={RESET_PATH} exact path={RESET_PATH} component={steps[0].component} />
      </Switch>
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
