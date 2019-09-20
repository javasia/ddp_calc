import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import { withStylesPropTypes } from 'react-with-styles';
import useStyles from './style';

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
          <MenuItem key={item.name} value={item.name}>{item.description}</MenuItem>
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
