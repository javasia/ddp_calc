import React from 'react';
import AppButton from '../AppButton';
import './fullWidthButton.css';

function FullWidthAppButton(props) {
  return (
    <AppButton {...props} className="full-width-button" style={{ margin: '1px 0' }} />
  );
}

export default FullWidthAppButton;
