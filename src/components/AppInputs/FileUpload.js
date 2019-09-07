import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { withStylesPropTypes } from 'react-with-styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

export default function FileUpload(props) {
  const classes = useStyles();
  const { fileType, style } = props;

  return (
    <div>
      <label htmlFor="contained-button-file">
        <input
          accept={fileType}
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
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
  fileType: '',
};

FileUpload.propTypes = {
  fileType: PropTypes.string,
  style: withStylesPropTypes.styles,
};
