import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { withStylesPropTypes } from 'react-with-styles';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

function AddButton(props) {
  const classes = useStyles();
  const { style, handleClick } = props;

  return (
    <div style={style}>
      <Fab
        color="primary"
        aria-label="add"
        className={classes.fab}
        size="small"
        onClick={handleClick}
      >
        <AddIcon />
      </Fab>
    </div>
  );
}

AddButton.defaultProps = {
  style: {},
};

AddButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  style: withStylesPropTypes.styles,
};

export default AddButton;
