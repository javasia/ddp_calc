import React from 'react';
import { withStylesPropTypes } from 'react-with-styles';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import TextLabel from '../../AppTextInputs/TextLabel';
import BareTextInput from '../../AppTextInputs/BareTextInput';
import SimpleSelect from '../../AppTextInputs/SimpleSelect';

function ExpensesDistributionMethodLine(props) {
  const {
    style,
    disabled,
    criteriaOfDistribution,
    isHeader,
    placeholder,
  } = props;
  return (
    <>
      <Grid item xs={6}>
        {isHeader ? <TextLabel label="Expenses type" /> : null}
        <BareTextInput
          placeholder={placeholder}
          style={{ margin: 0, width: '100%', ...style }}
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={6}>
        {isHeader ? <TextLabel label="Distribute by" /> : null}
        <SimpleSelect
          criteriaOfDistribution={criteriaOfDistribution}
          style={{ width: '100%', ...style }}
          disabled={disabled}
        />
      </Grid>
    </>
  );
}

ExpensesDistributionMethodLine.defaultProps = {
  style: {},
  disabled: false,
  isHeader: false,
};

ExpensesDistributionMethodLine.propTypes = {
  placeholder: PropTypes.string.isRequired,
  criteriaOfDistribution: PropTypes.string.isRequired,
  style: withStylesPropTypes.styles,
  disabled: PropTypes.bool,
  isHeader: PropTypes.bool,
};

export default ExpensesDistributionMethodLine;
