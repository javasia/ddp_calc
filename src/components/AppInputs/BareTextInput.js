import React from 'react';
import { withStylesPropTypes } from 'react-with-styles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

export default function BareTextInput(props) {
  const {
    handleChange,
    placeholder,
    style,
    disabled,
    required,
    value,
  } = props;
  return (
    <TextField
      placeholder={placeholder}
      margin="normal"
      variant="outlined"
      style={style}
      inputProps={{ 'aria-label': 'bare' }}
      onChange={handleChange}
      disabled={disabled}
      required={required}
      value={value}
    />
  );
}

BareTextInput.defaultProps = {
  style: {},
  disabled: false,
  required: false,
  value: '',
};


BareTextInput.propTypes = {
  handleChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  style: withStylesPropTypes.styles,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  value: PropTypes.string,
};
