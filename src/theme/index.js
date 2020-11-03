import {DefaultTheme} from 'react-native-paper';

export const appColors = {
  primary: '#295FA0',
  background: '#FFF',
  backgroundContainer: 'rgba(88,129,144,0.7)',
  text: 'white',
};

export const NavigationTheme = {
  dark: false,
  colors: {
    primary: 'white',
    background: 'white',
    card: '#295FA0',
    border: 'green',
    text: 'white',
  },
};

export const AppTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    ...appColors,
    accent: 'black',
  },
};
