import {DefaultTheme} from 'react-native-paper';
import {DefaultTheme as NavigationDefaultTheme} from '@react-navigation/native';
const PRIMARY_COLOR = '#2374A5';

export const appColors = {
  lightBlue: 'rgba(17, 78, 117, 0.1)',
  myokBlue: PRIMARY_COLOR,
  darkBlue: '#195174',
  primary: PRIMARY_COLOR,
  surface: PRIMARY_COLOR,
  background: '#FFF',
  backgroundContainer: 'rgba(88,129,144,0.7)',
  text: 'white',
};

export const NavigationTheme = {
  ...NavigationDefaultTheme,
  dark: false,
  colors: {
    ...NavigationDefaultTheme.colors,
    primary: PRIMARY_COLOR,
    // background: 'transparent',
    card: PRIMARY_COLOR,
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
