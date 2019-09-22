import React from 'react';
import PropTypes from 'prop-types';
import { withStylesPropTypes } from 'react-with-styles';
import LabeledTextInput from '../../components/AppInputs/LabeledTextInput';


export default function ExpensesAmountDateLine(props) {
  const {
    total,
    subTotal,
    remainder,
    style,
  } = props;
  return (
    <div
      style={{
        display: 'flex',
        marginTop: '2em',
        justifyContent: 'center',
        alignItems: 'space-between',
      }}
    >
      <LabeledTextInput
        label="SubTotal"
        placeholder={subTotal}
        style={style}
      />
      <LabeledTextInput
        label="Total"
        placeholder={total}
        style={style}
      />
      <LabeledTextInput
        label="Remainder"
        placeholder={remainder}
        style={style}
      />
    </div>
  );
}

ExpensesAmountDateLine.defaultProps = {
  style: {
    marginRight: '5px',
  },
};

ExpensesAmountDateLine.propTypes = {
  style: withStylesPropTypes.styles,
  total: PropTypes.number.isRequired,
  subTotal: PropTypes.number.isRequired,
  remainder: PropTypes.number.isRequired,
};
