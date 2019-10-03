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
    type,
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
      type={type}
    />
  );
}

BareTextInput.defaultProps = {
  placeholder: '',
  style: {},
  disabled: false,
  required: false,
  type: '',
  // eslint-disable-next-line no-console
  handleChange: () => console.error('No change handler provided'),
};


BareTextInput.propTypes = {
  handleChange: PropTypes.func,
  placeholder: PropTypes.string,
  style: withStylesPropTypes.styles,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
};
