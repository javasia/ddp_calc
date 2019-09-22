import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PropTypes from 'prop-types';
import TextLabel from '../../components/AppInputs/TextLabel';
import FileUpload from '../../components/AppInputs/FileUpload';
import BareTextInput from '../../components/AppInputs/BareTextInput';
import DownloadPreview from './DownloadPreview';
import { downloadTemplatePreview } from '../../constants/imageData';

export default function EditCargoData(props) {
  const [value, setValue] = React.useState('');

  function handleChange(event) {
    setValue(event.target.value);
    props.handleChange();
  }
  return (
    <div className="frame-holder">
      <h1 className="frame-header">Fill in cargo data:</h1>
      <h2 className="frame-header">Type of transport:</h2>
      <RadioGroup
        aria-label="transport"
        name="transport"
        value={value}
        onChange={handleChange}
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
      <TextLabel
        label="Upload data  from excel"
        style={{ marginTop: '1em' }}
      />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <BareTextInput />
        <FileUpload fileType=".xlsx" />
      </div>
      <DownloadPreview
        images={[
          downloadTemplatePreview,
        ]}
      />
    </div>
  );
}

EditCargoData.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
