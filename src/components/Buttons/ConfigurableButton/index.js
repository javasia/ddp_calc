import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}));

export default function Submit({buttonText, style}) {
  const classes = useStyles();
  return (
    <Button variant="contained" color="primary" style={style} className={classes.button}>
      {buttonText}
    </Button>
  );
}
