import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepButton from '@material-ui/core/StepButton'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import ChooseAction from '../ChooseAction'
import ChooseTemplate from '../ChooseTemplate'
import EditCargoData from '../EditCargoData'
import EditPaymentDates from '../EditPaymentDates'
import EditTemplate from '../EditTemplate'
import Logout from  '../Logout'

const useStyles = makeStyles(theme => ({
  root: {
    width: "90%"
  },
  button: {
    marginRight: theme.spacing(1)
  },
  completed: {
    display: "inline-block"
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}))

const steps = [
  {
    label: "Choose action",
    message: "Step 1: what are we going to do?",
    component: <ChooseAction />,
  }, 
  {
    label: "Choose template",
    message: "Step 2: Choose a template or create a new one...",
    component: <ChooseTemplate />,
  }, 
  {
    label: "View/edit template", 
    message: "Step 3: Edit template or click submit...",
    component: <EditTemplate />,
  }, 
  {
    label: "Fill in the cargo data", 
    message: "Step 4: Please fill in cargo data...",
    component: <EditCargoData />,
  }, 
  {
    label: "Payment dates by expenses", 
    message: "Step 5: Please fill in payment dates and amounts...",
    component: <EditPaymentDates />,
  }, 
]

function getStepsContent(step) {
  return steps[step] || 
  {
    label: "Unknown",
    message: "Unknown step", 
    component: null,
  } 
}
export default function AppStepper() {
  const classes = useStyles()
  const [activeStep, setActiveStep] = React.useState(0)
  const [completed, setCompleted] = React.useState({})

  function totalSteps() {
    return steps.length
  }

  function completedSteps() {
    return Object.keys(completed).length
  }

  function isLastStep() {
    return activeStep === totalSteps() - 1
  }

  function allStepsCompleted() {
    return completedSteps() === totalSteps()
  }

  // It's the last step, but not all steps have been completed,
  // find the first step that has been completed
  function handleNext() {
    if (isLastStep() && !allStepsCompleted()) {
      setActiveStep(steps.findIndex((step, i) => !(i in completed)))
    } else {
      setActiveStep(activeStep + 1)
    }   
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleStep = step => () => {
    setActiveStep(step)
  }

  function handleComplete() {
    const newCompleted = completed
    newCompleted[activeStep] = true
    setCompleted(newCompleted)
    handleNext()
  }

  function handleReset() {
    setActiveStep(0)
    setCompleted({})
  }
 
  const {component, message} = getStepsContent(activeStep);
  return (
    <div className={classes.root}>
      <Logout />
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map(({label}, index) => (
          <Step key={label}>
            <StepButton
              onClick={handleStep(index)}
              completed={completed[index]}
            >
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      {component}
      <div style={{
            position: 'fixed',
            bottom: '15px',
            left: '50%',
            transform: 'translateX(-50%)',
      }}>
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
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant="caption" className={classes.completed}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleComplete}
                  >
                    {completedSteps() === totalSteps() - 1
                      ? "Finish"
                      : "Complete Step"}
                  </Button>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
