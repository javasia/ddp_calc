import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { withStylesPropTypes } from 'react-with-styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect(props) {
  const classes = useStyles();

  function handleChange(event) {
    props.handleChange(event);
  }

  const {
    style,
    value,
    name,
    disabled,
    menuItems,
  } = props;
  return (
    <div>
      <Select
        value={value}
        onChange={handleChange}
        displayEmpty
        name={name}
        className={classes.selectEmpty}
        style={style}
        disabled={disabled}
      >
        {Object.values(menuItems).map(item => (
          <MenuItem value={item.name}>{item.description}</MenuItem>
        ))}
      </Select>
    </div>
  );
}

SimpleSelect.defaultProps = {
  style: {},
};

SimpleSelect.propTypes = {
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  style: withStylesPropTypes.styles,
  menuItems: PropTypes.objectOf(PropTypes.string).isRequired,
};
