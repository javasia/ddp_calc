import React from 'react';
import BareTextInput from '../../../components/AppInputs/BareTextInput';
import AppButton from '../../../components/AppButtons/AppButton';

function CreateNewCalculation() {
  return (
    <div className="frame-holder">
      <h1 className="frame-header">Create new calculation:</h1>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <BareTextInput style={{ width: '100%' }} placeholder="New calculation name" handleChange={null} />
        <AppButton>Create</AppButton>
      </div>
    </div>
  );
}

export default CreateNewCalculation;
