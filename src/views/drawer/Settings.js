import React from 'react';
import {View, Text} from 'react-native';
import {useRoute} from '@react-navigation/native';

import {globalStyles} from 'styles/index';

const Settings = () => {
  const route = useRoute();
  console.log(route);
  return (
    <View style={globalStyles.center}>
      <Text style={globalStyles.title}>Settings</Text>
    </View>
  );
};

export default Settings;
