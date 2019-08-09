import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import Login from './components/Login';
import AppStepper from './components/AppStepper';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userSelector } from './reducers/user';


function App (props) {
  const {isAuthorized} = props.user;
  console.log(props.user);
  return (
    <Switch>
      <Route path='/start' component={isAuthorized ? AppStepper : Login} />
      <Redirect from='/' exact to='/start' />
      <Route render={() => <h1>Path not found!</h1>} />
    </Switch>
  );
}

App.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: userSelector(state),
});

export default connect(mapStateToProps, null)(App);

