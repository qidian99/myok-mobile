import {Container} from 'components/base';
import React from 'react';
import {View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {globalStyles} from 'styles/index';
import {appColors} from 'theme/index';

const AuthContainer = ({children}) => {
  const {colors} = useTheme();
  return (
    <Container containerStyle={globalStyles.authContainer}>
      {children}
    </Container>
  );
};

export default AuthContainer;
