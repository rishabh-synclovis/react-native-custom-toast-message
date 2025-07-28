import React, { createContext, useContext } from 'react';
import {
  ToastProvider as RNToastProvider,
  useToast as useRNToast,
} from 'react-native-toast-notifications';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  return (
    <RNToastProvider placement="top">
      <InnerToastProvider>{children}</InnerToastProvider>
    </RNToastProvider>
  );
};

// Inner component that gets access to the real useToast()
const InnerToastProvider = ({ children }) => {
  const toast = useRNToast();

  const showTypedToast = (type, message, position = 'top', duration = 3000) => {
    const colors = {
      success: '#4caf50',
      warning: '#ff9800',
      error: '#f44336',
    };

    toast.show(message, {
      type: 'custom_type',
      placement: position,
      duration: duration,
      style: {
        backgroundColor: colors[type] || '#000',
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderRadius: 10,
      },
      textStyle: {
        color: '#fff',
        fontSize: 14,
      },
    });
  };

  return (
    <ToastContext.Provider value={{ showTypedToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
