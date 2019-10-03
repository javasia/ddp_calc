import React, { useState, useEffect, useCallback } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import { STEPS as steps } from '../../constants/steps';
import ROUTES from '../../constants/routes';
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
  const RESET_PATH = `${match.path}/${steps[0].path}`;
  const resultPath = `${ROUTES.HOME_ROUTE}${ROUTES.DDP_CALCULATION_RESULT}`;
  const { location: { pathname: locationPathname } } = window;

  const getStepPath = useCallback((stepNumber = (activeStep || 0)) => (
    match && match.path && steps && steps[stepNumber] && steps[stepNumber].path
      ? `${match.path}/${steps[stepNumber].path}`
      : RESET_PATH
  ), [RESET_PATH, activeStep, match]);

  useEffect(() => {
    const isResultPath = () => locationPathname === resultPath;
    const isPathnameMatchStep = () => locationPathname === getStepPath();
    if (!isResultPath() && !isPathnameMatchStep()) {
      history.push(RESET_PATH);
      setActiveStep(() => 0);
    }
  }, [locationPathname, RESET_PATH, resultPath, getStepPath, history]);

  const isLastStep = useCallback(
    (stepNumber = activeStep) => stepNumber === steps.length - 1,
    [activeStep],
  );

  const isStepOptional = useCallback(
    (stepNumber = activeStep) => !!steps[stepNumber].optional,
    [activeStep],
  );

  const isStepSkipped = useCallback(
    () => skipped.has(activeStep),
    [activeStep, skipped],
  );

  const getNextUrl = useCallback(
    () => (isLastStep(activeStep) ? resultPath : getStepPath(activeStep + 1)),
    [resultPath, activeStep, getStepPath, isLastStep],
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
    [activeStep, getNextUrl, history, isStepOptional],
  );

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
                  handleBack,
                  handleNext,
                  handleSkip,
                  stepContent: steps[activeStep].message,
                  isStepOptional: isStepOptional(),
                  isLastStep: isLastStep(),
                  isBackButtonDisabled: activeStep === 0,
                }}
              />
            )}
          />
        ))}
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
