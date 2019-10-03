import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddButton from '../../components/AppButtons/AddButton';
import Footer from '../../components/AppStepper/Footer';
import criteriaOfDistribution from '../../constants/criteriaOfDistribution';
import {
  addStateOfExpenses,
  deleteStateOfExpenses,
  setName,
  templateSelector,
  resetTemplate,
  setCriterion,
} from '../../store/reducers/statesOfExpenses';
import ExpensesDistributionMethodLine from './ExpensesDistributionMethodLine';
import validators from '../../utils/validators';
import useStyles from './style';
import { accountingCurrency } from '../../constants/defaultTemplate';

const mapDispatchToProps = ({
  dispatchAddStateOfExpenses: addStateOfExpenses,
  dispatchDeleteStateOfExpenses: deleteStateOfExpenses,
  dispatchSetName: setName,
  dispatchSetCriterion: setCriterion,
  dispatchResetTemplate: resetTemplate,
});

const mapStateToProps = state => ({
  template: templateSelector(state),
});

function EditTemplateView(props) {
  const classes = useStyles();
  const { footerProps, template } = props;
  const [errorLabels, setErrorLabels] = useState({});

  function validate() {
    const { validateEmpty5, validateLonger30 } = validators;
    const newErrorLabels = {
      ...template.map(({ name }) => validateEmpty5(name) || validateLonger30(name)),
    };
    setErrorLabels(newErrorLabels);
    return Object.values(newErrorLabels).every(errorMessage => !!errorMessage === false);
  }

  function handleAdd() {
    const { dispatchAddStateOfExpenses } = props;
    dispatchAddStateOfExpenses({
      name: '',
      isDefault: false,
      currency: accountingCurrency,
      criterion: Object.values(criteriaOfDistribution)[0],
    });
  }

  function handleChangeInput(event, index) {
    const { dispatchSetName } = props;
    dispatchSetName({
      index,
      name: event.target.value.toUpperCase(),
    });
  }

  function handleSkip() {
    const { dispatchResetTemplate } = props;
    dispatchResetTemplate();
  }

  function handleDelete(index) {
    const { dispatchDeleteStateOfExpenses } = props;
    dispatchDeleteStateOfExpenses(index);
  }

  function handleChangeCriterion(event, index) {
    const { dispatchSetCriterion } = props;
    dispatchSetCriterion({
      index,
      criterion: event.target.value,
    });
  }

  return (
    <div className="frame-holder">
      <h1 className="frame-header">Edit template:</h1>
      <div className={classes.root} style={{ marginTop: '40px' }}>
        <Grid container spacing={3}>
          {template.map((
            {
              name: nameOfStateOfExpenses,
              criterion: { name: nameOfCriterion },
              isDefault,
            },
            idx,
          ) => (
            <ExpensesDistributionMethodLine
              // eslint-disable-next-line react/no-array-index-key
              key={idx}
              nameOfStateOfExpenses={nameOfStateOfExpenses}
              distributionCriterion={nameOfCriterion}
              disabled={isDefault}
              isHeader={idx === 0}
              nameOfSelect="criterion"
              handleChangeInput={event => handleChangeInput(event, idx)}
              handleChangeCriterion={event => handleChangeCriterion(event, idx)}
              handleDelete={() => handleDelete(idx)}
              isDefault={isDefault}
              errorLabel={
                {
                  showError: !!errorLabels[idx],
                  errorType: errorLabels[idx],
                }
              }
            />
          ))}
        </Grid>
        <AddButton style={{ marginTop: '30px', textAlign: 'center' }} handleClick={handleAdd} />
      </div>
      <Footer {...footerProps} validate={validate} reset={handleSkip} />
    </div>
  );
}

EditTemplateView.propTypes = {
  footerProps: PropTypes.shape({
    handleBack: PropTypes.func.isRequired,
    handleNext: PropTypes.func.isRequired,
    handleSkip: PropTypes.func.isRequired,
    isStepOptional: PropTypes.bool.isRequired,
    isLastStep: PropTypes.bool.isRequired,
    stepContent: PropTypes.string.isRequired,
    isBackButtonDisabled: PropTypes.bool,
  }).isRequired,
  template: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    criterion: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
    currency: PropTypes.string,
    isDefault: PropTypes.bool.isRequired,
  })).isRequired,
  dispatchAddStateOfExpenses: PropTypes.func.isRequired,
  dispatchDeleteStateOfExpenses: PropTypes.func.isRequired,
  dispatchSetName: PropTypes.func.isRequired,
  dispatchSetCriterion: PropTypes.func.isRequired,
  dispatchResetTemplate: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditTemplateView);
