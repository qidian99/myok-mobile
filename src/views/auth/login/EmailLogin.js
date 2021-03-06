import React, {useState, useCallback} from 'react';
import {
  View,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  Text,
  StyleSheet,
} from 'react-native';
import RadioButton from 'components/common/RadioButton';
import {globalStyles} from 'styles/index';
import AuthHeader from 'components/auth/AuthHeader';
import AuthContainer from 'components/auth/AuthContainer';
import AuthInput from 'components/auth/AuthInput';
import {CenterButton} from 'components/auth/AuthButton';
import {ScrollView} from 'react-native-gesture-handler';
import {Header} from '@react-navigation/stack';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {useTheme} from 'react-native-paper';

const EmailLogin = () => {
  const [checked, setChecked] = React.useState('push');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onEmailChange = useCallback(
    (text) => {
      setEmail(text);
    },
    [setEmail],
  );

  const onPasswordChange = useCallback(
    (text) => {
      setPassword(text);
    },
    [setPassword],
  );

  const {verificationTextStyle} = styles;

  const theme = useTheme();
  // const offset = useBottomTabBarHeight();
  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        keyboardVerticalOffset={80}
        behavior={Platform.OS === 'ios' ? 'position' : 'height'}>
        <ScrollView>
          <View style={globalStyles.container}>
            <AuthContainer>
              <View style={globalStyles.authCard}>
                <AuthHeader
                  title="Login with Email &amp; Password"
                  intro="Welcome back! Please select a verification code option and enter your login information."
                />
                <Text style={verificationTextStyle}>
                  Select a verification code option:
                </Text>
                <RadioButton
                  color={theme.colors.primary}
                  text="Push App Notification"
                  selected={checked === 'push'}
                  onPress={() => setChecked('push')}
                />
                <RadioButton
                  color={theme.colors.primary}
                  text="Email Verification Code"
                  selected={checked === 'email'}
                  onPress={() => setChecked('email')}
                />
                <AuthInput
                  title="Email Address"
                  value={email}
                  hint="Email address"
                  onChangeText={onEmailChange}
                />
                <AuthInput
                  title="Password"
                  value={password}
                  hint="Password"
                  onChangeText={onPasswordChange}
                  secureTextEntry
                />
                {/* <AuthInput
                  title="Password"
                  value={password}
                  hint="Password"
                  onChangeText={onPasswordChange}
                  secureTextEntry
                />
                <AuthInput
                  title="Password"
                  value={password}
                  hint="Password"
                  onChangeText={onPasswordChange}
                  secureTextEntry
                />
                <AuthInput
                  title="Password"
                  value={password}
                  hint="Password"
                  onChangeText={onPasswordChange}
                  secureTextEntry
                />
                <AuthInput
                  title="Password"
                  value={password}
                  hint="Password"
                  onChangeText={onPasswordChange}
                  secureTextEntry
                /> */}
                <CenterButton
                  text="Send Code"
                  disabled={email.length === 0 || password.length === 0}
                />
              </View>
            </AuthContainer>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  verificationTextStyle: {
    color: '#195174',
    fontSize: 14,
    marginTop: 15,
  },
});

export default EmailLogin;
