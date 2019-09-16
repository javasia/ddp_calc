import React from 'react';
import BareTextInput from '../../../components/AppInputs/BareTextInput';
import DateInput from '../../../components/AppInputs/DateInput';
import AddButton from '../../../components/AppButtons/AddButton';
import DeleteButton from '../../../components/AppButtons/DeleteButton';

export default function ExpensesAmountDateLine() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <BareTextInput
        placeholder="SubAmount 1"
        style={{
          marginRight: '5px',
        }}
      />
      <DateInput
        label="Date of payment"
        style={{
          marginRight: '5px',
        }}
      />
      <AddButton />
      <DeleteButton />
    </div>
  );
}
