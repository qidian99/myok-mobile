import React from 'react';

import {
  NavigationContainer,
  DarkTheme,
  useTheme,
  DefaultTheme,
} from '@react-navigation/native';

import {useColorScheme, AppearanceProvider} from 'react-native-appearance';
import {linking} from './src/navigation';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {store, persistor} from 'reducers/index';
import Main from 'navigation/Main';
import {NavigationTheme} from 'theme/index';

const App = () => {
  const colorScheme = useColorScheme();
  const theme = useTheme();
  const navigationTheme = theme.dark ? DarkTheme : NavigationTheme;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppearanceProvider>
          <NavigationContainer
            theme={navigationTheme}
            // theme={colorScheme === 'dark' ? DarkTheme : NavigationTheme}
            linking={linking}>
            <Main />
          </NavigationContainer>
        </AppearanceProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
