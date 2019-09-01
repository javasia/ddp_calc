import React from 'react';
import FullWidthAppButton from '../../AppButtons/FullWidthAppButton/FullWidthAppButton';
import AppButton from '../../AppButtons/AppButton';

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
        justifyContent: 'space-evenly',
      }}
      >
        <AppButton>Create new</AppButton>
        <AppButton>Skip and use default</AppButton>
      </div>
    </div>
  );
}

export default ChooseTemplateView;
