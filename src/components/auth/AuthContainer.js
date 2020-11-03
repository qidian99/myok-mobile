import {Container} from 'components/base';
import React from 'react';
import {View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {globalStyles} from 'styles/index';
import {appColors} from 'theme/index';

const AuthContainer = ({children}) => {
  const {colors} = useTheme();
  console.log('colors', colors.background);
  return (
    <Container
      containerStyle={[
        globalStyles.authContainer,
        {backgroundColor: appColors.backgroundContainer},
      ]}>
      {children}
    </Container>
  );
};

export default AuthContainer;
