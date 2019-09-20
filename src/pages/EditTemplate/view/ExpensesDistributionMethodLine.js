import React from 'react';
import { withStylesPropTypes } from 'react-with-styles';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import TextLabel from '../../../components/AppInputs/TextLabel';
import BareTextInput from '../../../components/AppInputs/BareTextInput';
import SimpleSelect from '../../../components/AppInputs/SimpleSelect/SimpleSelect';
import CRITERIA from '../../../constants/criteriaOfDistribution';

function ExpensesDistributionMethodLine(props) {
  const {
    style,
    disabled,
    defaultValue,
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
          value={defaultValue}
          style={{ width: '100%', ...style }}
          disabled={disabled}
          menuItems={CRITERIA}
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
  defaultValue: PropTypes.string.isRequired,
  style: withStylesPropTypes.styles,
  disabled: PropTypes.bool,
  isHeader: PropTypes.bool,
};

export default ExpensesDistributionMethodLine;
