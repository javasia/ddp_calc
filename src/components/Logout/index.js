import React from 'react';
import ConfigurableButton from '../Buttons/ConfigurableButton'
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { logout } from '../../reducers/user'
import { connect } from 'react-redux';


function Logout({logout}) {
  const handleClick = () => {
    logout();
  }
  return (
    <Link to='/start' onClick={handleClick}>
      <ConfigurableButton buttonText='Logout' style={{
        position: 'absolute',
        top: '0px',
        right: '0px',
      }} />
    </Link>
  )
}

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
};

const mapDispatchToProps = ({
  logout: logout,
});

export default connect(null, mapDispatchToProps)(Logout);