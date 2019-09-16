import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { dispatchLogout } from '../../store/reducers/user';
import AppButton from '../../components/AppButtons/AppButton';
import ROUTES from '../../constants/routes';

function Logout({ logout }) {
  const handleClick = () => {
    logout();
  };
  return (
    <Link to={ROUTES.AUTHENTICATION_ROUTE} onClick={handleClick}>
      <AppButton
        style={{
          position: 'absolute',
          top: '0px',
          right: '0px',
        }}
        onClick={handleClick}
      >
          Logout
      </AppButton>
    </Link>
  );
}

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
};

const mapDispatchToProps = ({
  logout: dispatchLogout,
});

export default connect(null, mapDispatchToProps)(Logout);
