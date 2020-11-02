import {Container} from 'components/base';
import React from 'react';
import {View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {styles} from 'styles/index';

const AuthContainer = ({children}) => {
  const {colors} = useTheme();
  console.log('colors', colors.background);
  return (
    <Container
      containerStyle={[
        styles.authContainer,
        {backgroundColor: colors.background},
      ]}>
      {children}
    </Container>
  );
};

export default AuthContainer;
