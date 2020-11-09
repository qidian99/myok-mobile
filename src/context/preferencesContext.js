import React from 'react';

export const PreferencesContext = React.createContext({
  rtl: 'left',
  theme: 'light',
  size: 'small',
  toggleTheme: () => {},
  toggleRTL: () => {},
  toggleFont: () => {},
});
