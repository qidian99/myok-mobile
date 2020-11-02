import React from 'react';

import {NavigationContainer, DarkTheme} from '@react-navigation/native';

import {useColorScheme, AppearanceProvider} from 'react-native-appearance';
import {createAuthStack, createHomeStack, linking} from './src/navigation';
import {MyTheme} from './src/theme';
import {Provider} from 'react-redux';
import {store} from 'reducers';
import Main from 'navigation/Main';

const App = () => {
  const colorScheme = useColorScheme();
  return (
    <Provider store={store}>
      <AppearanceProvider>
        <NavigationContainer
          theme={colorScheme === 'dark' ? DarkTheme : MyTheme}
          linking={linking}>
          <Main />
        </NavigationContainer>
      </AppearanceProvider>
    </Provider>
  );
};

export default App;
