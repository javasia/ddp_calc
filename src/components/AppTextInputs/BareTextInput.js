import React from 'react';
import { withStylesPropTypes } from 'react-with-styles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

export default function BareTextInput(props) {
  const {
    handleChange,
    placeholder,
    style,
    id,
    disabled,
  } = props;
  return (
    <TextField
      id={id}
      placeholder={placeholder}
      margin="normal"
      variant="outlined"
      style={style}
      inputProps={{ 'aria-label': 'bare' }}
      onChange={handleChange}
      disabled={disabled}
    />
  );
}

BareTextInput.defaultProps = {
  style: {},
  id: '',
  disabled: false,
};


BareTextInput.propTypes = {
  handleChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  style: withStylesPropTypes.styles,
  id: withStylesPropTypes.string,
  disabled: PropTypes.bool,
};
