import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
  divDownloadTemplate: {
    cursor: 'pointer',
    boxShadow: '#bdbdbd 4px 5px 5px 0px',
  },
  imgDownloadTemplate: {
    display: 'block',
    marginTop: '30px',
  },
  spanDownloadTemplate: {
    display: 'block',
    textAlign: 'center',
    fontSize: '0.9em',
    backgroundColor: '#e0e0e0',
  },
}));

export default useStyles;
