import { ToasterTypes } from 'commons/enum';
import React from 'react';

export interface ToasterError {
  status: ToasterTypes;
  message?: string | React.ReactNode;
}

export interface IToasterContext {
  error: undefined | ToasterError;
  showToaster: (
    status: ToasterTypes,
    message: string | React.ReactNode
  ) => void;
  hideToaster: () => void;
}

/**
 * @summary: Creates a React.Context for display Toaster
 */
const ToasterContext = React.createContext({
  error: undefined,
  showToaster: () => { },
  hideToaster: () => { },
} as IToasterContext);

export default ToasterContext;
