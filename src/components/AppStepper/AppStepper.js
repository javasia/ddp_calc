import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Stepper from '@material-ui/core/Stepper';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink, Route, Switch } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import STEPS from '../../constants/steps';
import Logout from '../../pages/Logout';
import useStyles from './style';

function getStepsContent(step) {
  return STEPS[step]
    || {
      label: 'Unknown',
      message: 'Unknown step',
      component: null,
      path: '',
    };
}

export default function AppStepper({ match }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  function getTotalStepsLength() {
    return STEPS.length;
  }

  function completedSteps() {
    return Object.keys(completed).length;
  }

  function isLastStep() {
    return activeStep === getTotalStepsLength() - 1;
  }

  function allStepsCompleted() {
    return completedSteps() === getTotalStepsLength();
  }

  // It's the last step, but not all steps have been completed,
  // find the first step that has been completed
  function handleNextStep() {
    if (isLastStep() && !allStepsCompleted()) {
      setActiveStep(STEPS.findIndex((step, i) => !(i in completed)));
    } else {
      setActiveStep(activeStep + 1);
    }
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  const handleStepperClick = (stepNumber) => {
    setActiveStep(stepNumber);
  };

  function handleComplete() {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNextStep();
  }

  function handleReset() {
    setActiveStep(0);
    setCompleted({});
  }

  const { message } = getStepsContent(activeStep);

  return (
    <div className={classes.root}>
      <Logout />
      <Stepper nonLinear activeStep={activeStep}>
        {STEPS.map(({ label, path }, stepNumber) => (
          <Step key={label} data-step_number={stepNumber}>
            <Link component={StepButton} to="/">
              <RouterLink to={`${match.path}/${path}`}>
                <StepButton
                  completed={completed[stepNumber]}
                  onClick={() => handleStepperClick(stepNumber)}
                >
                  {label}
                </StepButton>
              </RouterLink>
            </Link>
          </Step>
        ))}
      </Stepper>

      <Switch>
        {STEPS.map(step => (
          <Route path={`${match.path}/${step.path}`} component={step.component} />
        ))}
        <Route path={`${match.path}`} component={STEPS[0].component} />
      </Switch>

      <div style={{
        position: 'fixed',
        bottom: '15px',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
      >
        {allStepsCompleted() ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {message}
            </Typography>
            <div>
              <Link component={RouterLink} to={`${match.path}/${STEPS[activeStep > 0 ? activeStep - 1 : 0].path}`}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.button}
                >
                  Back
                </Button>
              </Link>
              <Link component={RouterLink} to={`${match.path}/${STEPS[isLastStep() ? 0 : activeStep + 1].path}`}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNextStep}
                  className={classes.button}
                >
                  Next
                </Button>
              </Link>
              {activeStep !== STEPS.length
                && (completed[activeStep] ? (
                  <Typography variant="caption" className={classes.completed}>
                    Step
                    {' '}
                    {activeStep + 1}
                    {' '}
                    already completed
                  </Typography>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleComplete}
                  >
                    {completedSteps() === getTotalStepsLength() - 1
                      ? 'Finish'
                      : 'Complete Step'}
                  </Button>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

AppStepper.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      path: PropTypes.node,
    }).isRequired,
  }).isRequired,
};
