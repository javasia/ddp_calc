import React from 'react';
import { withStylesPropTypes } from 'react-with-styles';
import PropTypes from 'prop-types';


function TextLabel(props) {
  const {
    label,
    style,
  } = props;
  return (
    <div style={{ marginBottom: '1px', fontSize: '1em', ...style }}>{`${label}:`}</div>
  );
}

TextLabel.defaultProps = {
  style: {},
};

TextLabel.propTypes = {
  label: PropTypes.string.isRequired,
  style: withStylesPropTypes.styles,
};

export default TextLabel;
