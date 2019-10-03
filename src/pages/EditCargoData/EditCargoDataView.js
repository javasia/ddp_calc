import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextLabel from '../../components/AppInputs/TextLabel';
import FileUpload from './FileUpload';
import BareTextInput from '../../components/AppInputs/BareTextInput';
import Footer from '../../components/AppStepper/Footer';
import {
  transportTypeSelector,
  setTransportType,
  cargoDataSelector,
  setCargoData,
  cargoDataFileNameSelector,
} from '../../store/reducers/data';
import validators from '../../utils/validators';
import DownloadTemplate from './DownloadTemplate';
import ErrorLabel from '../../components/ErrorLabel';

const mapStateToProps = state => ({
  transportType: transportTypeSelector(state),
  cargoData: cargoDataSelector(state),
  fileName: cargoDataFileNameSelector(state),
});

const mapDispatchToProps = ({
  dispatchSetTransportType: setTransportType,
  dispatchCargoData: setCargoData,
});

function EditCargoData(props) {
  const [errorLabels, setErrorLabels] = useState({});
  const {
    footerProps,
    dispatchSetTransportType,
    transportType,
    cargoData,
    dispatchCargoData,
    fileName,
  } = props;

  function validate() {
    const {
      validateRadioNotSelected,
      validateFileNotProvided,
      validateWrongDataFormat,
    } = validators;
    const newErrorLabels = {
      transportType: validateRadioNotSelected(transportType),
      fileName: validateFileNotProvided(fileName),
      cargoData: !validateFileNotProvided(fileName) && validateWrongDataFormat(cargoData),
    };
    setErrorLabels(newErrorLabels);
    return Object.values(newErrorLabels).every(errorType => !!errorType === false);
  }

  function handleRadioChange(event) {
    dispatchSetTransportType(event.target.value);
  }

  return (
    <div className="frame-holder">
      <h1 className="frame-header">Fill in cargo data:</h1>
      <h2 className="frame-header">Type of transport:</h2>
      <RadioGroup
        aria-label="transport"
        name="transport"
        value={transportType}
        onChange={handleRadioChange}
        style={{ marginTop: '.5em' }}
        row
      >
        <FormControlLabel
          value="40hq"
          control={<Radio color="primary" />}
          label="40'HQ sea container FCL"
          labelPlacement="start"
        />
        <FormControlLabel
          value="20dv"
          control={<Radio color="primary" />}
          label="20'DV sea container FCL"
          labelPlacement="start"
        />
        <FormControlLabel
          value="eurotent"
          control={<Radio color="primary" />}
          label="Truck FTL 33pallets/86CBM "
          labelPlacement="start"
        />
        <FormControlLabel
          value="lcl"
          control={<Radio color="primary" />}
          label="LCL/Groupage"
          labelPlacement="start"
        />
      </RadioGroup>
      { errorLabels.transportType && <ErrorLabel errorType={errorLabels.transportType} /> }
      <TextLabel
        label="Upload data  from excel"
        style={{ marginTop: '1em' }}
      />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <BareTextInput disabled value={fileName} />
        <FileUpload dispatchCargoData={dispatchCargoData} />
      </div>
      { errorLabels.fileName && <ErrorLabel errorType={errorLabels.fileName} /> }
      { errorLabels.cargoData && <ErrorLabel errorType={errorLabels.cargoData} /> }
      <DownloadTemplate />
      <Footer {...footerProps} validate={validate} />
    </div>
  );
}

EditCargoData.propTypes = {
  footerProps: PropTypes.shape({
    handleBack: PropTypes.func.isRequired,
    handleNext: PropTypes.func.isRequired,
    handleSkip: PropTypes.func.isRequired,
    isStepOptional: PropTypes.bool.isRequired,
    isLastStep: PropTypes.bool.isRequired,
    stepContent: PropTypes.string.isRequired,
    isBackButtonDisabled: PropTypes.bool,
  }).isRequired,
  dispatchSetTransportType: PropTypes.func.isRequired,
  transportType: PropTypes.string.isRequired,
  dispatchCargoData: PropTypes.func.isRequired,
  cargoData: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ])).isRequired,
    ).isRequired,
    cols: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        key: PropTypes.number.isRequired,
      }).isRequired,
    ).isRequired,
  }).isRequired,
  fileName: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCargoData);
