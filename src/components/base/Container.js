import React from 'react';
import {View} from 'react-native';

const AuthContainer = ({containerStyle, children}) => {
  return <View style={containerStyle}>{children}</View>;
};

export default AuthContainer;
