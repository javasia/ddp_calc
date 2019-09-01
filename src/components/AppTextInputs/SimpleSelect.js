import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { withStylesPropTypes } from 'react-with-styles';
import { CRITERIA_OF_DISTRIBUTION, VERBOSE_CRITERIA_DESCRIPTION } from '../../constants/criteriaOfDistribution';

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
    criteriaOfDistribution,
    name,
    disabled,
  } = props;
  return (
    <div>
      <Select
        value={criteriaOfDistribution}
        onChange={handleChange}
        displayEmpty
        name={name}
        className={classes.selectEmpty}
        style={style}
        disabled={disabled}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {Object.keys(CRITERIA_OF_DISTRIBUTION).map(criteria => (
          <MenuItem value={criteria}>{VERBOSE_CRITERIA_DESCRIPTION[criteria]}</MenuItem>
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
  criteriaOfDistribution: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  style: withStylesPropTypes.styles,
};
