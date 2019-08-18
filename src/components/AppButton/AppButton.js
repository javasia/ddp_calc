import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { withStylesPropTypes } from 'react-with-styles';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function AppButton(props) {
  const classes = useStyles();
  const { children: buttonValue, style: customStyle } = props;
  return (
    <Button variant="contained" color="primary" style={customStyle} className={classes.button}>
      {buttonValue}
    </Button>
  );
}

AppButton.defaultProps = {
  style: {},
};

AppButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  style: withStylesPropTypes.styles,
};
