/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import XLSX from 'xlsx';
import defaultCargoData from '../../constants/defaultCargoData.json';
import templateImg from './template.png';
import useStyles from './style';

function DownloadTemplate() {
  const classes = useStyles();

  function exportFile() {
    /* convert state to workbook */
    const ws = XLSX.utils.aoa_to_sheet(defaultCargoData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Template');
    /* generate XLSX file and send to client */
    XLSX.writeFile(wb, 'Template.xlsx');
  }

  return (
    <div className={classes.divDownloadTemplate} onClick={exportFile}>
      <img
        alt="Click to download template"
        src={templateImg}
        className={classes.imgDownloadTemplate}
        style={{ width: '-webkit-fill-available' }}
      />
      <span className={classes.spanDownloadTemplate}>Click to download template</span>
    </div>
  );
}

export default DownloadTemplate;
