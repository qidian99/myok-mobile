import React from 'react';
import {ImageBackground, View} from 'react-native';
import {Text} from 'react-native-paper';
import {styles} from 'styles';

const Login = () => {
  return (
    <View>
      <ImageBackground
        style={styles.background}
        source={require('../../assets/image/isafe_background.jpeg')}
      />
      <Text>Test</Text>
    </View>
  );
};

export default Login;
