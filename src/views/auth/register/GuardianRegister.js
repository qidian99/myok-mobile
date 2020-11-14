import React, {useState, useCallback} from 'react';
import {
  View,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  ScrollView,
} from 'react-native';
import DOBInput from 'components/auth/DOBInput';

import {globalStyles} from 'styles/index';
import AuthHeader from 'components/auth/AuthHeader';
import AuthContainer from 'components/auth/AuthContainer';
import AuthInput from 'components/auth/AuthInput';
import Separator from 'components/common/Separator';
import {CenterButton} from 'components/auth/AuthButton';

const GuardianRegister = () => {
  const [state, setState] = React.useState('');
  const [email, setEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  const [school, setSchool] = useState('');

  const onEmailChange = useCallback(
    (text) => {
      setEmail(text);
    },
    [setEmail],
  );

  const onSidChange = useCallback(
    (text) => {
      setStudentId(text);
    },
    [setStudentId],
  );

  const onStateChange = useCallback(
    (text) => {
      setState(text);
    },
    [setState],
  );

  const onSchoolChange = useCallback(
    (text) => {
      setSchool(text);
    },
    [setSchool],
  );

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : 'height'}>
        <ScrollView>
          <View style={globalStyles.container}>
            <AuthContainer>
              <View style={globalStyles.authCard}>
                <AuthHeader
                  title="Guardian Registration"
                  intro="If you are here for the first time we’ll help you set up your MyOk account in a few quick steps. Then, we will help you review any current requests for your approval. Let’s start."
                />
                <Separator
                  text="I have an email address on file"
                  textStyle={{fontWeight: '600'}}
                />
                <AuthHeader intro="You may create an account with the email address you’ve provided the school. After entering your email address, you will receive a registration code to continue." />
                <AuthInput
                  title="Please enter your email address, then click “Send Code.”"
                  value={email}
                  hint="Email Address"
                  onChangeText={onEmailChange}
                />
                <CenterButton text="Send Code" disabled={email.length === 0} />
                <Separator
                  text="Create account another way"
                  textStyle={{fontWeight: '600'}}
                />
                <AuthHeader intro="If you haven’t provided the school with your email address, create an account by filling out the information below." />
                <DOBInput title="Child’s Date of Birth" />
                <AuthInput
                  title="Student ID (SID)"
                  value={studentId}
                  hint="Student ID"
                  onChangeText={onSidChange}
                />
                <AuthInput
                  title="State"
                  value={state}
                  hint="Select State"
                  onChangeText={onStateChange}
                />
                <AuthInput
                  title="School Name"
                  value={school}
                  hint="Select a School"
                  onChangeText={onSchoolChange}
                />
                <CenterButton
                  text="Submit"
                  disabled={
                    !(studentId.length && state.length && school.length)
                  }
                />
              </View>
            </AuthContainer>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default GuardianRegister;
