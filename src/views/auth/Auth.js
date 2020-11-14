import AuthContainer from 'components/auth/AuthContainer';
import AuthForms from 'components/auth/AuthForms';
import React from 'react';
import {
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loginAdult} from 'sagas/actions';
import {globalStyles} from 'styles/index';
import {useTheme} from 'react-native-paper';

const logo = require('assets/image/ISAFE-direct-myok-logo.png');

const Auth = ({login}) => {
  const {colors} = useTheme();
  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : 'height'}>
        <View style={globalStyles.container}>
          <Image style={globalStyles.logo} source={logo} />
          <AuthContainer>
            <AuthForms colors={colors} />
          </AuthContainer>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      login: loginAdult,
    },
    dispatch,
  );

export default connect(null, mapDispatchToProps)(Auth);
