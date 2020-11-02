import React from 'react';

import {NavigationContainer, DarkTheme} from '@react-navigation/native';

import {useColorScheme, AppearanceProvider} from 'react-native-appearance';
import {createAuthStack, createHomeStack, linking} from './src/navigation';
import {MyTheme} from './src/theme';

const App = () => {
  const colorScheme = useColorScheme();

  return (
    <AppearanceProvider>
      <NavigationContainer
        theme={colorScheme === 'dark' ? DarkTheme : MyTheme}
        linking={linking}>
        {createAuthStack()}
      </NavigationContainer>
    </AppearanceProvider>
  );
};

export default App;
