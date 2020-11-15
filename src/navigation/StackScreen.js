import React from 'react';
import {TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import MaterialIcon from 'react-native-vector-icons/dist/MaterialIcons';
import {globalStyles} from 'styles';

const Stack = createStackNavigator();

const StackScreen = ({name, component, options, ...props}) => (
  <Stack.Screen
    name={name}
    component={component}
    options={({navigation, route}) => ({
      ...(typeof options === 'function' ? options(navigation, route) : options),
      cardStyle: {backgroundColor: 'transparent'},
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.pop()}
          style={globalStyles.headerButton}>
          <MaterialIcon name="keyboard-arrow-left" size={20} color="#FFF" />
        </TouchableOpacity>
      ),
    })}
    {...props}
  />
);

export default StackScreen;

export const HeaderBackImage = () => (
  <TouchableOpacity style={globalStyles.headerButton}>
    <MaterialIcon name="keyboard-arrow-left" size={20} color="#FFF" />
  </TouchableOpacity>
);
