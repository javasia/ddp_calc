import React from 'react';
import PropTypes from 'prop-types';
import errorMessages from '../constants/validation/errorMessages';

function ErrorLabel(props) {
  const { errorType } = props;
  const errorMessage = errorMessages[errorType] || errorType;

  return (
    <span className="error">{errorMessage}</span>
  );
}

ErrorLabel.propTypes = {
  errorType: PropTypes.string.isRequired,
};

export default ErrorLabel;
