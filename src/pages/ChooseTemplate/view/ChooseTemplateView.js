import React from 'react';
import FullWidthAppButton from '../../../components/AppButtons/FullWidthAppButton/FullWidthAppButton';
import AppButton from '../../../components/AppButtons/AppButton';

function ChooseTemplateView() {
  return (
    <div className="frame-holder">
      <h1 className="frame-header">Choose template:</h1>
      <li>
        <FullWidthAppButton>User template 1</FullWidthAppButton>
        <FullWidthAppButton>User template 2</FullWidthAppButton>
        <FullWidthAppButton>User template 3</FullWidthAppButton>
        <FullWidthAppButton>User template 4</FullWidthAppButton>
        <FullWidthAppButton>User template 5</FullWidthAppButton>
      </li>
      <div style={{
        display: 'flex',
        marginTop: '50px',
        justifyContent: 'center',
      }}
      >
        <AppButton>Create new</AppButton>
      </div>
    </div>
  );
}

export default ChooseTemplateView;
