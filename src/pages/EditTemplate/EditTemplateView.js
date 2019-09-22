import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import LabeledTextInput from '../../components/AppInputs/LabeledTextInput';
import ExpensesDistributionMethodLine from './ExpensesDistributionMethodLine';
import CRITERIA from '../../constants/criteriaOfDistribution';
import DEFAULT_STATES_OF_EXPENSES from '../../constants/defaultStatesOfExpenses';
import AddButton from '../../components/AppButtons/AddButton';

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
  const { cost: { name: cost }, volume: { name: volume }, weight: { name: weight } } = CRITERIA;
  return (
    <div className="frame-holder">
      <h1 className="frame-header">Edit template:</h1>
      <LabeledTextInput placeholder="My New Template" label="Name of template" />
      <div className={classes.root} style={{ marginTop: '40px' }}>
        <Grid container spacing={3}>
          <ExpensesDistributionMethodLine
            placeholder={DEFAULT_STATES_OF_EXPENSES.INVOICE_COST}
            defaultValue={cost}
            disabled
            isHeader
          />
          <ExpensesDistributionMethodLine
            placeholder={DEFAULT_STATES_OF_EXPENSES.TRANSPORTATION}
            defaultValue={volume}
            disabled
          />
          <ExpensesDistributionMethodLine
            placeholder={DEFAULT_STATES_OF_EXPENSES.CUSTOMS_DUTY}
            defaultValue={weight}
            disabled
          />
          <ExpensesDistributionMethodLine
            placeholder={DEFAULT_STATES_OF_EXPENSES.LOADING_UNLOADING}
            defaultValue={weight}
            disabled
          />
        </Grid>
        <AddButton style={{ textAlign: 'right' }} handleClick={null} />
      </div>
    </div>
  );
}

export default EditTemplateView;
