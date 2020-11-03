import {DefaultTheme} from 'react-native-paper';

const PRIMARY_COLOR = '#295FA0';

export const appColors = {
  primary: PRIMARY_COLOR,
  background: '#FFF',
  backgroundContainer: 'rgba(88,129,144,0.7)',
  text: 'white',
};

export const NavigationTheme = {
  dark: false,
  colors: {
    primary: PRIMARY_COLOR,
    background: 'transparent',
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
