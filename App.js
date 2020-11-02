import React from 'react';

import {NavigationContainer, DarkTheme} from '@react-navigation/native';

import {useColorScheme, AppearanceProvider} from 'react-native-appearance';
import {createAuthStack, createHomeStack, linking} from './src/navigation';
import {MyTheme} from './src/theme';
import {Provider} from 'react-redux';
import {store} from 'reducers';

const App = () => {
  const colorScheme = useColorScheme();

  console.log('store', store.getState().auth);
  const {token} = store.getState().auth;

  return (
    <Provider store={store}>
      <AppearanceProvider>
        <NavigationContainer
          theme={colorScheme === 'dark' ? DarkTheme : MyTheme}
          linking={linking}>
          {token ? createHomeStack() : createAuthStack()}
        </NavigationContainer>
      </AppearanceProvider>
    </Provider>
  );
};

export default App;
