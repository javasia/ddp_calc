import React from 'react';
import { withStylesPropTypes } from 'react-with-styles';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import TextLabel from '../../components/AppInputs/TextLabel';
import BareTextInput from '../../components/AppInputs/BareTextInput';
import SimpleSelect from '../../components/AppInputs/SimpleSelect/SimpleSelect';
import CRITERIA from '../../constants/criteriaOfDistribution';
import DeleteButton from '../../components/AppButtons/DeleteButton';
import ErrorLabel from '../../components/ErrorLabel';

function ExpensesDistributionMethodLine(props) {
  const {
    style,
    disabled,
    distributionCriterion,
    isHeader,
    nameOfStateOfExpenses,
    nameOfSelect,
    isDefault,
    handleChangeInput,
    handleChangeCriterion,
    handleDelete,
    errorLabel: { showError, errorType },
  } = props;
  return (
    <>
      <Grid item xs={6}>
        {isHeader ? <TextLabel label="Expenses type" /> : null}
        <BareTextInput
          value={nameOfStateOfExpenses}
          placeholder={nameOfStateOfExpenses ? '' : 'NEW STATE OF EXPENSES'}
          style={{ margin: 0, width: '100%', ...style }}
          disabled={disabled}
          handleChange={handleChangeInput}
        />
      </Grid>
      <Grid item xs={5}>
        {isHeader ? <TextLabel label="Distribute by" /> : null}
        <SimpleSelect
          value={distributionCriterion}
          style={{ width: '100%', ...style }}
          disabled={disabled}
          menuItems={CRITERIA}
          name={nameOfSelect}
          key={nameOfStateOfExpenses + nameOfSelect}
          handleChange={handleChangeCriterion}
        />
      </Grid>
      <Grid item xs={1}>
        <DeleteButton
          style={{ marginTop: 'auto', visibility: isDefault ? 'hidden' : '' }}
          handleDelete={handleDelete}
        />
      </Grid>
      {
        showError && (
        <Grid item xs={12}>
          <ErrorLabel errorType={errorType} />
        </Grid>
        )
      }
    </>
  );
}

ExpensesDistributionMethodLine.defaultProps = {
  style: {},
  disabled: false,
  isHeader: false,
};

ExpensesDistributionMethodLine.propTypes = {
  nameOfStateOfExpenses: PropTypes.string.isRequired,
  distributionCriterion: PropTypes.string.isRequired,
  style: withStylesPropTypes.styles,
  disabled: PropTypes.bool,
  isHeader: PropTypes.bool,
  nameOfSelect: PropTypes.string.isRequired,
  isDefault: PropTypes.bool.isRequired,
  handleChangeInput: PropTypes.func.isRequired,
  handleChangeCriterion: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  errorLabel: PropTypes.shape({
    showError: PropTypes.bool.isRequired,
    errorType: PropTypes.string,
  }).isRequired,
};

export default ExpensesDistributionMethodLine;
