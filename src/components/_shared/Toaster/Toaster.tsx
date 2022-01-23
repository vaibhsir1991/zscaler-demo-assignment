import React from 'react';
import { TOASTER_TIME_OUT } from 'commons/constants';
import ToasterContext from 'contexts/ToasterContext/ToasterContext';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';

/**
 * @summary Display toaster with message
 * @returns Toaster
 */
const Toaster = () => {
  const { error, hideToaster } = React.useContext(ToasterContext);

  return error ? (
    <Snackbar
      open={!!error}
      autoHideDuration={TOASTER_TIME_OUT}
      onClose={hideToaster}
    >
      <Alert
        onClose={hideToaster}
        severity={error?.status}
        sx={{ width: '100%' }}
      >
        {error.message}
      </Alert>
    </Snackbar>
  ) : null;
};

export default Toaster;
