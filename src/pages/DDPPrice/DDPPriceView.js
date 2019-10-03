import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import ROUTES from '../../constants/routes';
import { dataReadySelector } from '../../store/reducers/data';

const mapStateToProps = state => ({
  dataReady: dataReadySelector(state),
});

function DDPPriceView(props) {
  const { dataReady } = props;

  return dataReady ? (
    <>
      <h1>DDPPrice is under construction</h1>
    </>
  ) : (
    <Redirect to={ROUTES.STEPPER_ROUTE} />
  );
}

DDPPriceView.propTypes = {
  dataReady: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, null)(DDPPriceView);
