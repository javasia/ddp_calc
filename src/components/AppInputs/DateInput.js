import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { withStylesPropTypes } from 'react-with-styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function DateInput(props) {
  const classes = useStyles();
  const {
    label, style, handleChange, date,
  } = props;

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="date"
        label={label}
        type="date"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        style={style}
        defaultValue={date}
        onChange={handleChange}
      />
    </form>
  );
}

DateInput.defaultProps = {
  style: {},
  label: '',
  date: '',
};

DateInput.propTypes = {
  label: PropTypes.string,
  style: withStylesPropTypes.styles,
  handleChange: PropTypes.func.isRequired,
  date: PropTypes.string,
};
