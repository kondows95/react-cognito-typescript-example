import React, {PropsWithChildren} from 'react';
import { Button, CircularProgress}  from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  progress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  item: {
    [theme.breakpoints.down("xs")]: { 
      padding: theme.spacing(1, 0, 1), //TXL
    }, 
    [theme.breakpoints.up("sm")]: { 
      padding: theme.spacing(2, 0, 1, 1), //TRBL
    },
  },
}));

type Props = { disabled: boolean }

const SubmitButton: React.FC<PropsWithChildren<Props>> = (props) => {
  const classes = useStyles();

  let loading = null;
  if (props.disabled) {
    loading = <CircularProgress size={20} color="primary" className={classes.progress} />;
  }
  return (
    <Button
        fullWidth 
        {...props} 
        variant="contained" 
        color="primary"
        type="submit"
      > 
        {props.children || "Submit"}
        {loading}
      </Button>
  )
};
export default SubmitButton;