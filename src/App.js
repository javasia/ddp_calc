import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import AppStepperLinear from './components/AppStepper/AppStepperLinear';
import ROUTES from './constants/routes';
import DDPPriceView from './pages/DDPPrice';
import './style.css';

function App() {
  return (
    <Switch>
      <Route path={`${ROUTES.HOME_ROUTE}${ROUTES.STEPPER_ROUTE}`} component={AppStepperLinear} />
      <Route path={`${ROUTES.HOME_ROUTE}${ROUTES.DDP_CALCULATION_RESULT}`} component={DDPPriceView} />
      <Redirect to={`${ROUTES.HOME_ROUTE}${ROUTES.STEPPER_ROUTE}`} />
    </Switch>
  );
}

export default App;
