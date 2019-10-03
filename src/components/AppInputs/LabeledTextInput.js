import React from 'react';
import { withStylesPropTypes } from 'react-with-styles';
import PropTypes from 'prop-types';
import BareTextInput from './BareTextInput';
import TextLabel from './TextLabel';


function LabeledTextInput(props) {
  const {
    handleChange,
    label,
    placeholder,
    style,
    value,
    disabled,
  } = props;
  return (
    <div style={{ marginTop: '15px', marginBottom: '10px', ...style }}>
      <TextLabel label={label} />
      <BareTextInput
        placeholder={placeholder}
        handleChange={handleChange}
        style={{ margin: 0 }}
        value={value}
        disabled={disabled}
      />
    </div>
  );
}

LabeledTextInput.defaultProps = {
  placeholder: '',
  style: {},
  value: '',
  disabled: true,
};

LabeledTextInput.propTypes = {
  handleChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  style: withStylesPropTypes.styles,
  value: PropTypes.string,
  disabled: PropTypes.bool,
};

export default LabeledTextInput;
