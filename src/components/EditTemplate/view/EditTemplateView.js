import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import LabeledTextInput from '../../AppInputs/LabeledTextInput';
import ExpensesDistributionMethodLine from './ExpensesDistributionMethodLine';
import { CRITERIA_OF_DISTRIBUTION } from '../../../constants/criteriaOfDistribution';
import DEFAULT_STATES_OF_EXPENSES from '../../../constants/defaultStatesOfExpenses';
import AddButton from '../../AppButtons/AddButton';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function EditTemplateView() {
  const classes = useStyles();
  return (
    <div className="frame-holder">
      <h1 className="frame-header">Edit template:</h1>
      <LabeledTextInput placeholder="My New Template" label="Name of template" />
      <div className={classes.root} style={{ marginTop: '40px' }}>
        <Grid container spacing={3}>
          <ExpensesDistributionMethodLine
            placeholder={DEFAULT_STATES_OF_EXPENSES.INVOICE_COST}
            criteriaOfDistribution={CRITERIA_OF_DISTRIBUTION.cost}
            disabled
            isHeader
          />
          <ExpensesDistributionMethodLine
            placeholder={DEFAULT_STATES_OF_EXPENSES.TRANSPORTATION}
            criteriaOfDistribution={CRITERIA_OF_DISTRIBUTION.volume}
            disabled
          />
          <ExpensesDistributionMethodLine
            placeholder={DEFAULT_STATES_OF_EXPENSES.CUSTOMS_DUTY}
            criteriaOfDistribution={CRITERIA_OF_DISTRIBUTION.cost}
            disabled
          />
          <ExpensesDistributionMethodLine
            placeholder={DEFAULT_STATES_OF_EXPENSES.LOADING_UNLOADING}
            criteriaOfDistribution={CRITERIA_OF_DISTRIBUTION.weight}
            disabled
          />
        </Grid>
        <AddButton alignment="right" handleClick={null} />
      </div>
    </div>
  );
}

export default EditTemplateView;
