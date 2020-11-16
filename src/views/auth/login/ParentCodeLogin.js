import React, {useState, useCallback} from 'react';
import {View, KeyboardAvoidingView, SafeAreaView, Platform} from 'react-native';
import {globalStyles} from 'styles/index';
import AuthHeader from 'components/auth/AuthHeader';
import AuthContainer from 'components/auth/AuthContainer';
import AuthInput from 'components/auth/AuthInput';
import DOBInput from 'components/auth/DOBInput';
import {CenterButton} from 'components/auth/AuthButton';

const ParentCodeLogin = () => {
  const [parentCode, setParentCode] = useState('');

  const onParentCodeChange = useCallback(
    (text) => {
      setParentCode(text);
    },
    [setParentCode],
  );

  const [date, setDate] = useState(new Date());

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };
  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : 'height'}>
        <View style={globalStyles.container}>
          <AuthContainer>
            <View style={globalStyles.authCard}>
              <AuthHeader
                title="Login with Parent Code"
                intro="Please enter your Parent Code and Date of Birth. If you do not know what to enter, ask your parents."
              />
              <AuthInput
                title="Parent Code"
                value={parentCode}
                hint="Parent Code"
                onChangeText={onParentCodeChange}
              />
              <DOBInput date={date} onChange={onDateChange} />
              <CenterButton text="Login" disabled={parentCode.length === 0} />
            </View>
          </AuthContainer>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ParentCodeLogin;
