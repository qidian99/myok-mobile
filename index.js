/**
 * @format
 */

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  AppRegistry,
  I18nManager,
  ImageBackground,
  View,
  StyleSheet,
} from 'react-native';
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

import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';

// Must be outside of any component LifeCycle (such as `componentDidMount`).
PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,
});

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
