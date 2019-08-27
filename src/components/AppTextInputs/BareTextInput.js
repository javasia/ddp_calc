import React from 'react';
import { withStylesPropTypes } from 'react-with-styles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

export default function BareTextInput(props) {
  const { handleChange, placeholder, style } = props;
  return (
    <TextField
      id="outlined-bare"
      placeholder={placeholder}
      margin="normal"
      variant="outlined"
      style={style}
      inputProps={{ 'aria-label': 'bare' }}
      onChange={handleChange}
    />
  );
}

BareTextInput.defaultProps = {
  style: {},
};


BareTextInput.propTypes = {
  handleChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  style: withStylesPropTypes.styles,
};
