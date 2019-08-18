import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Login from './components/Login';
import AppStepper from './components/AppStepper/AppStepper';
import { userAuthSelector } from './store/reducers/user';
import ROUTES from './constants/routes';

const mapStateToProps = state => ({
  isAuthorized: userAuthSelector(state),
});

function App(props) {
  const { isAuthorized } = props;
  return (
    <Switch>
      <Route path={ROUTES.AUTHENTICATION_ROUTE} component={isAuthorized ? AppStepper : Login} />
      <Redirect from={ROUTES.HOME_ROUTE} exact to={ROUTES.AUTHENTICATION_ROUTE} />
      <Route render={() => <h1>Path not found!</h1>} />
    </Switch>
  );
}

App.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, null)(App);