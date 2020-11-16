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
import Separator from 'components/common/Separator';
import {CenterButton} from 'components/auth/AuthButton';

const EducatorRegister = () => {
  const [checked, setChecked] = React.useState('push');
  const [email, setEmail] = useState('');

  const onEmailChange = useCallback(
    (text) => {
      setEmail(text);
    },
    [setEmail],
  );

  const {verificationTextStyle} = styles;

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : 'height'}>
        <View style={globalStyles.container}>
          <AuthContainer>
            <View style={globalStyles.authCard}>
              <AuthHeader
                title="Educator Registration"
                intro="If you are here for the first time we’ll help you set up your MyOk account in a few quick steps. Then, we will help you review any current requests for your approval. Let’s start."
              />
              <Separator
                text="I have an email address on file"
                textStyle={{fontWeight: '600'}}
              />
              <AuthHeader intro="You may create an account with the email address you’ve provided the school." />
              <Text style={verificationTextStyle}>
                Select a verification code option:
              </Text>
              <RadioButton
                text="Push App Notification"
                selected={checked === 'push'}
                onPress={() => setChecked('push')}
              />
              <RadioButton
                text="Email Verification Code"
                selected={checked === 'email'}
                onPress={() => setChecked('email')}
              />
              <AuthInput
                title="Please enter your email address, then click “Send Code.”"
                value={email}
                hint="Email address"
                onChangeText={onEmailChange}
              />
              <CenterButton text="Send Code" disabled={email.length === 0} />
            </View>
          </AuthContainer>
        </View>
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

export default EducatorRegister;
