import React, { createContext, useContext, useRef } from 'react';
import { ToastProvider as RNToastProvider } from 'react-native-toast-notifications';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const toastRef = useRef(null);

  const showTypedToast = (type, message, position = 'top', duration = 3000) => {
    const colors = {
      success: '#4caf50',
      warning: '#ff9800',
      error: '#f44336',
    };

    toastRef.current.show(message, {
      type: 'custom_type', // You can also define your own types if needed
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
      <RNToastProvider ref={toastRef} placement="top">
        {children}
      </RNToastProvider>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
