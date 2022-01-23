import { Box, Modal, Typography } from '@mui/material';
import React from 'react';

interface Props {
  children:
    | React.ReactElement
    | React.ReactChild
    | React.ReactFragment
    | React.ReactNode
    | React.ReactPortal
    | null
    | undefined;
}

interface State {
  error: any;
  errorInfo: any;
}

/**
 * @summary Error Boundry catches runtime errors and performs defined action (@here Show error modal)
 * @param children ReactComponent
 * @returns ErrorModal OR children
 */
class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <Modal
          open={true}
          onClose={() => {
            this.setState({
              error: null,
              errorInfo: null,
            });
          }}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              Error
            </Typography>
            <Typography id='modal-modal-description' sx={{ mt: 2 }}>
              {this.state.error.message}
            </Typography>
          </Box>
        </Modal>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}

export default ErrorBoundary;
