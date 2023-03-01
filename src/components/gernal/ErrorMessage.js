import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@mui/material/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function ErrorMessage({message}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert severity="error">{message}</Alert>
    </div>
  );
}