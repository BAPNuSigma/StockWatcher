import React, { createContext, useContext, useState } from 'react';

export type ErrorLogEntry = {
  timestamp: string;
  message: string;
  stack?: string;
};

export type ErrorLogContextType = {
  log: ErrorLogEntry[];
  addError: (error: Error) => void;
  clearLog: () => void;
};

const ErrorLogContext = createContext<ErrorLogContextType | undefined>(undefined);

export const ErrorLogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [log, setLog] = useState<ErrorLogEntry[]>([]);

  const addError = (error: Error) => {
    setLog((prev) => [
      ...prev,
      {
        timestamp: new Date().toISOString(),
        message: error.message,
        stack: error.stack,
      },
    ]);
  };

  const clearLog = () => setLog([]);

  return (
    <ErrorLogContext.Provider value={{ log, addError, clearLog }}>
      {children}
    </ErrorLogContext.Provider>
  );
};

export const useErrorLog = () => {
  const context = useContext(ErrorLogContext);
  if (!context) throw new Error('useErrorLog must be used within ErrorLogProvider');
  return context;
}; 