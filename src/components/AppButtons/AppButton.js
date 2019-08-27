import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { withStylesPropTypes } from 'react-with-styles';
import clsx from 'clsx';


const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function AppButton(props) {
  const classes = useStyles();
  const { children: buttonValue, style, className } = props;
  return (
    <Button variant="contained" color="primary" style={style} className={clsx(classes.root, className)}>
      {buttonValue}
    </Button>
  );
}

AppButton.defaultProps = {
  style: {},
  className: '',
};

AppButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  style: withStylesPropTypes.styles,
  className: PropTypes.string,
};
