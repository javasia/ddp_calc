import React from 'react';
import Button from '@material-ui/core/Button';
import { withStylesPropTypes } from 'react-with-styles';
import PropTypes from 'prop-types';
import XLSX from 'xlsx';
import useStyles from './style';

function FileUpload(props) {
  const classes = useStyles();
  const { style, dispatchCargoData } = props;

  function handleFile(file /* :File */, fileName /* :String */) {
    /* generate an array of column objects */
    const makeCols = (refstr) => {
      const o = [];
      const C = XLSX.utils.decode_range(refstr).e.c + 1;
      for (let i = 0; i < C; i += 1) o[i] = { name: XLSX.utils.encode_col(i), key: i };
      return o;
    };

    /* Boilerplate to set up FileReader */
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = (e) => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      const cols = makeCols(ws['!ref']);
      /* Dispatch data */
      dispatchCargoData({
        data,
        cols,
        fileName,
      });
    };
    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
  }

  function handleChange(e) {
    const { target: { files, value } } = e;
    const fileName = value.replace(/.*\\/g, '');
    if (files && files[0]) handleFile(files[0], fileName);
  }

  return (
    <div>
      <label htmlFor="contained-button-file">
        <input
          accept=".xlsx,.xls"
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
          onChange={handleChange}
        />
        <Button
          variant="contained"
          component="span"
          className={classes.button}
          style={style}
        >
          Upload
        </Button>
      </label>
    </div>
  );
}

FileUpload.defaultProps = {
  style: {},
};

FileUpload.propTypes = {
  style: withStylesPropTypes.styles,
  dispatchCargoData: PropTypes.func.isRequired,
};

export default FileUpload;
