import React, {useState, useEffect} from 'react';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  
export default function FloatingAlert({ open, message, autoHideDuration = 6000, onClose, action }) {
  const [isMessageShown, setIsMessageShown] = useState(false);

  useEffect(() => {
    const messageShown = localStorage.getItem('messageShown');
    if (messageShown === message) {
      setIsMessageShown(true);
    } else {
      setIsMessageShown(false);
    }
  }, [message]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    onClose && onClose(event, reason);
    localStorage.setItem('messageShown', message);
  };

  const defaultAction = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        Fechar
      </Button>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  if (isMessageShown) {
    return null;
  }

  return (
    <Snackbar sev open={open} autoHideDuration={autoHideDuration} onClose={handleClose} message={message} action={action || defaultAction}>
        <Alert severity="success">{message}</Alert>
    </Snackbar>
    
  );
}
