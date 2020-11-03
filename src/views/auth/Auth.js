import AuthContainer from 'components/auth/AuthContainer';
import AuthForms from 'components/auth/AuthForms';
import React from 'react';
import {ImageBackground, View, Image, SafeAreaView} from 'react-native';
import {Button} from 'react-native-paper';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loginAction} from 'sagas/actions';
import {globalStyles} from 'styles/index';

const backgroundImage = require('assets/image/isafe_background.jpeg');
const logo = require('assets/image/logo.png');

const Login = ({login}) => {
  return (
    <ImageBackground style={globalStyles.background} source={backgroundImage}>
      <SafeAreaView>
        <View style={globalStyles.container}>
          <Image style={globalStyles.logo} source={logo} />
          <AuthContainer>
            <AuthForms />
          </AuthContainer>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      login: loginAction,
    },
    dispatch,
  );

export default connect(null, mapDispatchToProps)(Login);
