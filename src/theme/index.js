import {DefaultTheme} from 'react-native-paper';

export const appColors = {
  primary: '#295FA0',
  background: 'rgba(88,129,144,0.7)',
};

export const NavigationTheme = {
  dark: false,
  colors: {
    primary: 'white',
    background: 'white',
    card: '#295FA0',
    text: 'white',
    border: 'green',
  },
};

export const AppTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    ...appColors,
    accent: '#f1c40f',
  },
};
