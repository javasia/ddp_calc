import React from 'react';
import ButtonMUI from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

const Button = withRouter((props) => {
  const {
    history,
    url,
    onClick,
    children,
  } = props;
  return (
    <ButtonMUI
      {...props}
      onClick={() => {
        history.push(url);
        onClick();
      }}
    >
      {children}
    </ButtonMUI>
  );
});

export default Button;
