import React from 'react';
import ToasterContext, { ToasterError } from './ToasterContext';

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

/**
 * @summary: Context Provider to initialize ToasterContext
 * @param children: ReactComponents
 * @returns: ReactComponent wrapped in ToasterContext
 */
const ToasterProvider = ({ children }: Props): React.ReactElement => {
  const [error, setError] = React.useState<ToasterError | undefined>(undefined);

  const contextValue = {
    error,
    showToaster: React.useCallback(
      (status, message) => setError({ status, message }),
      []
    ),
    hideToaster: React.useCallback(() => setError(undefined), []),
  };

  return (
    <ToasterContext.Provider value={contextValue}>
      {children}
    </ToasterContext.Provider>
  );
};

export default ToasterProvider;
