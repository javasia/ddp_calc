import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Preloader(props) {
  const { isVisible } = props;

  return isVisible && (
    <div className="preloader">
      <span>LOADING...</span>
    </div>
  );
}

Preloader.defaultProps = {
  isVisible: false,
};

Preloader.propTypes = {
  isVisible: PropTypes.bool,
};

export default Preloader;
