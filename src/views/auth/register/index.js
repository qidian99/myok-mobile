import React from 'react';
import {View, KeyboardAvoidingView, SafeAreaView, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {globalStyles} from 'styles/index';
import AuthHeader from 'components/auth/AuthHeader';
import {GotoButton} from 'components/auth/AuthButton';
import AuthContainer from 'components/auth/AuthContainer';

const Register = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : 'height'}>
        <View style={globalStyles.container}>
          <AuthContainer>
            <View style={globalStyles.authCard}>
              <AuthHeader
                title="MyOk Registration"
                intro="Please select one of the options below to continue with registration."
              />
              <GotoButton
                text="I’m a guardian"
                onPress={() => navigation.push('GuardianRegister')}
              />
              <GotoButton text="I’m a student" />
              <GotoButton text="I’m an educator" />
              <GotoButton
                text="I’m a school district employee"
                onPress={() => navigation.push('EmployeeRegister')}
              />
            </View>
          </AuthContainer>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;
