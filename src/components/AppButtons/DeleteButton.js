import React from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import { withStylesPropTypes } from 'react-with-styles';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function DeleteButton(props) {
  const classes = useStyles();
  const { style, handleDelete } = props;

  return (
    <div style={style}>
      <Fab
        aria-label="delete"
        className={classes.fab}
        size="small"
        onClick={handleDelete}
      >
        <DeleteIcon />
      </Fab>
    </div>
  );
}

DeleteButton.defaultProps = {
  style: {},
};

DeleteButton.propTypes = {
  style: withStylesPropTypes.styles,
  handleDelete: PropTypes.func.isRequired,
};
