/**
 * @format
 */

import React from 'react';
import {AppRegistry, I18nManager} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';
import {AppTheme} from 'theme/index';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
  useTheme,
  DefaultTheme,
} from '@react-navigation/native';
import RNRestart from 'react-native-restart';

import {useColorScheme, AppearanceProvider} from 'react-native-appearance';
import {linking} from './src/navigation';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {store, persistor} from 'reducers/index';
import {NavigationTheme} from 'theme/index';
import {PreferencesContext} from './src/context/preferencesContext';
const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {...PaperDarkTheme.colors, ...NavigationDarkTheme.colors},
};

const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...AppTheme,
  ...NavigationDefaultTheme,
  ...NavigationTheme,
};

export default function Main() {
  // The iOS dark theme
  // const colorScheme = useColorScheme();
  // const theme = useTheme();

  const colorScheme = useColorScheme();
  const [theme, setTheme] = React.useState(
    colorScheme === 'dark' ? 'dark' : 'light',
  );
  const [rtl] = React.useState(I18nManager.isRTL);
  const [size, setSize] = React.useState('small');

  const toggleRTL = React.useCallback(() => {
    I18nManager.forceRTL(!rtl);
    RNRestart.Restart();
  }, [rtl]);

  const preferences = React.useMemo(() => {
    function toggleTheme() {
      setTheme(theme === 'light' ? 'dark' : 'light');
    }
    function toggleFont() {
      setSize(size === 'small' ? 'large' : 'small');
    }
    return {
      toggleTheme,
      toggleRTL,
      toggleFont,
      theme,
      rtl: rtl ? 'right' : 'left',
      size,
    };
  }, [rtl, theme, size, toggleRTL]);

  const navigationTheme =
    theme === 'dark' ? NavigationDarkTheme : NavigationTheme;
  const appTheme = theme === 'dark' ? PaperDarkTheme : AppTheme;

  // Need to build and re-render
  // EStyleSheet.build(size === 'small' ? {$rem: 10} : {$rem: 12});

  return (
    <PreferencesContext.Provider value={preferences}>
      <PaperProvider theme={appTheme}>
        <NavigationContainer
          theme={navigationTheme}
          // theme={colorScheme === 'dark' ? DarkTheme : NavigationTheme}
          linking={linking}>
          <App />
        </NavigationContainer>
      </PaperProvider>
    </PreferencesContext.Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
