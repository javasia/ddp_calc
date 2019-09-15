import React from 'react';
import BareTextInput from '../../AppInputs/BareTextInput';
import DateInput from '../../AppInputs/DateInput';
import AddButton from '../../AppButtons/AddButton';
import DeleteButton from '../../AppButtons/DeleteButton';

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
