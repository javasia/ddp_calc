import React from 'react';
import CheckPersistedCalculations from './CheckPersistedCalculations';
import CreateNewCalculation from './CreateNewCalculation';

export default function ChooseActionView() {
  return (
    <>
      <CheckPersistedCalculations />
      <CreateNewCalculation />
    </>
  );
}
