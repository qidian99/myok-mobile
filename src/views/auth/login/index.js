import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {GotoButton} from 'components/auth/AuthButton';
import AuthHeader from 'components/auth/AuthHeader';
import AuthContainer from 'components/auth/AuthContainer';
import {globalStyles} from 'styles/index';
import Separator from 'components/common/Separator';

const NormalLogins = () => {
  const {forgotPasswordContainerStyle, forgotPasswordTextStyle} = styles;
  const navigation = useNavigation();
  return (
    <View>
      <GotoButton
        text="Login with email and password"
        onPress={() => navigation.push('EmailLogin')}
      />
      <GotoButton
        text="Login with Parent Code"
        onPress={() => navigation.push('ParentCodeLogin')}
      />
      <TouchableOpacity
        style={forgotPasswordContainerStyle}
        activeOpacity={0.8}
        onPress={() => {}}>
        <Text style={forgotPasswordTextStyle}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

const OAuthLogins = () => {
  const {oAuthContainerStyle, oAuthTextStyle} = styles;

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[oAuthContainerStyle, {backgroundColor: '#3b5998'}]}>
        <View style={{padding: 10, width: 80}}>
          <Image
            source={require('assets/image/facebook.png')}
            style={{width: 20, height: 20}}
          />
        </View>
        <Text style={oAuthTextStyle}>Continue with Facebook</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[oAuthContainerStyle, {backgroundColor: '#227BEF'}]}>
        <View style={{padding: 5, width: 80}}>
          <Image
            source={require('assets/image/google.png')}
            style={{width: 30, height: 30}}
          />
        </View>
        <Text style={oAuthTextStyle}>Continue with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

const Login = () => {
  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : 'height'}>
        <View style={globalStyles.container}>
          <AuthContainer>
            <View style={globalStyles.authCard}>
              <AuthHeader
                title="Login to MyOk"
                intro="Please select one of the login options to continue."
              />
              <NormalLogins />
              <Separator text="or" />
              <OAuthLogins />
            </View>
          </AuthContainer>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  forgotPasswordContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  forgotPasswordTextStyle: {
    color: '#2374A5',
    fontSize: 12,
    fontStyle: 'italic',
    fontWeight: '600',
  },
  oAuthContainerStyle: {
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    height: 40,
    marginTop: 15,
    overflow: 'hidden',
  },
  oAuthTextStyle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Login;
