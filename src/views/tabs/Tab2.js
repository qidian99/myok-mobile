import React from 'react';
import {View, Text} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

import {globalStyles} from 'styles/index';

const Tab2 = () => {
  const isFocused = useIsFocused();

  // console.log(isFocused);

  return (
    <View style={globalStyles.center}>
      <Text style={globalStyles.title}>Tab 2</Text>
    </View>
  );
};

export default Tab2;
