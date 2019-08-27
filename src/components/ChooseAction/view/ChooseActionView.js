import React from 'react';
import CheckPersistedCalculations from './CheckPersistedCalculations';
import CreateNewCalculation from './CreateNewCalculation';
import '../../style.css';

export default function ChooseActionView() {
  return (
    <>
      <CheckPersistedCalculations />
      <CreateNewCalculation />
    </>
  );
}
