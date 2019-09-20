import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '90%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  footer: {
    position: 'fixed',
    bottom: '15px',
    left: '50%',
    transform: 'translateX(-50%)',
  },
}));

export default useStyles;
