import React from 'react';

import {NavigationContainer, DarkTheme} from '@react-navigation/native';

import {useColorScheme, AppearanceProvider} from 'react-native-appearance';
import {linking} from './src/navigation';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {store, persistor} from 'reducers/index';
import Main from 'navigation/Main';
import {MyTheme} from 'theme/index';

const App = () => {
  const colorScheme = useColorScheme();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppearanceProvider>
          <NavigationContainer
            theme={colorScheme === 'dark' ? DarkTheme : MyTheme}
            linking={linking}>
            <Main />
          </NavigationContainer>
        </AppearanceProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
