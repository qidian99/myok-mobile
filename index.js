/**
 * @format
 */

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {AppRegistry, I18nManager, ImageBackground, View, StyleSheet} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  ActivityIndicator,
  useTheme,
  Colors,
  Text,
} from 'react-native-paper';
import {AppTheme} from 'theme/index';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import RNRestart from 'react-native-restart';
import EStyleSheet from 'react-native-extended-stylesheet';

import {useColorScheme, AppearanceProvider} from 'react-native-appearance';
import {linking} from './src/navigation';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {store, persistor} from 'reducers/index';
import {NavigationTheme} from 'theme/index';
import {PreferencesContext} from './src/context/preferencesContext';
import {globalStyles} from './src/styles';

const APP_BACKGROUND = require('assets/image/isafe_background.jpeg');

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
  const [theme, setTheme] = useState(colorScheme === 'dark' ? 'dark' : 'light');
  const [rtl] = useState(I18nManager.isRTL);
  const [size, setSize] = useState('small');

  const [render, setRender] = useState(true);

  useEffect(() => {
    if (!render) {
      EStyleSheet.clearCache();
      setTimeout(() => setRender(true), 600);
    }
  }, [render, size]);

  const toggleRTL = useCallback(() => {
    I18nManager.forceRTL(!rtl);
    RNRestart.Restart();
  }, [rtl]);

  const preferences = useMemo(() => {
    function toggleTheme() {
      setTheme(theme === 'light' ? 'dark' : 'light');
    }
    function toggleFont() {
      setSize(size === 'small' ? 'large' : 'small');
      setRender(false);
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
  EStyleSheet.build(size === 'small' ? {$rem: 14} : {$rem: 20});

  return (
    <PreferencesContext.Provider value={preferences}>
      <PaperProvider theme={appTheme}>
        <NavigationContainer
          theme={navigationTheme}
          // theme={colorScheme === 'dark' ? DarkTheme : NavigationTheme}
          linking={linking}>
          {render ? <App /> : <LoadingView />}
        </NavigationContainer>
      </PaperProvider>
    </PreferencesContext.Provider>
  );
}

const LoadingView = () => {
  const theme = useTheme();

  return (
    <View
      style={[
        globalStyles.loading,
        {backgroundColor: theme.colors.background},
      ]}>
      <ActivityIndicator
        animating={true}
        size="large"
        color={theme.colors.primary}
      />
    </View>
  );
};

AppRegistry.registerComponent(appName, () => Main);
