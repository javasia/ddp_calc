import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React from "react";
import {Link} from 'react-router-dom';
import Submit from '../Buttons/ConfigurableButton';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userSelector, setUserData } from '../../reducers/user';

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    position: 'absolute',
    top: '50%',
    left: '50%',
    padding: "20px 30px 40px",
    transform: "translate(-50%, -50%)",
    width: "350px",
    flexDirection: "column",
    backgroundColor: "#ccffff",
    borderRadius: "3px",
    boxShadow: "3px 3px #cccccc",
    boxSizing: "border-box"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: "10px",
    backgroundColor: "white"
  }
}));

function Login(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    email: "",
    password: "",
  });
  
  const handleChange = ({target : {name, value}}) => {
    setValues({ ...values, [name]: value });
  }

  const handleSubmit = () => {
    const {email, password} = values;
    props.setUserData({email, password});
  }

  return (
    <form className={classes.container} noValidate autoComplete="off" onSubmit={handleSubmit}>
      <TextField
        id="outlined-email-input"
        name="email"
        label="Email"
        className={classes.textField}
        type="email"
        autoComplete="email"
        margin="normal"
        variant="outlined"
        onChange={handleChange}
      />
      <TextField
        id="outlined-password-input"
        name="password"
        label="Password"
        className={classes.textField}
        type="password"
        autoComplete="current-password"
        margin="normal"
        variant="outlined"
        onChange={handleChange}
      />
      <Link to='/' onClick={handleSubmit} style={{display: 'contents'}}>
        <Submit buttonText='Submit'/>
      </Link>
    </form>
  );
}

Login.propTypes = {
  user: PropTypes.object.isRequired,
  setUserData: PropTypes.func.isRequired,
};

const mapDispatchToProps = ({
  setUserData: setUserData,
});

const mapStateToProps = state => ({
  user: userSelector(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);