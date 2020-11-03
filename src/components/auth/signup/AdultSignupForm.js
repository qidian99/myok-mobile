import {AccordionList, Accordion} from 'components/base';
import TextInput from 'components/common/TextInput';
import React, {useCallback, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme, Button, HelperText} from 'react-native-paper';
import {set} from 'react-native-reanimated';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loginAdult} from 'sagas/actions';
import {globalStyles} from 'styles/index';
import {appColors} from 'theme';

const AuthLoginForm = ({login}) => {
  const {colors} = useTheme();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);

  const onSubmit = useCallback(() => {
    let error = false;
    if (email.length === 0) {
      setEmailError(true);
      error = true;
    }
    if (password.length === 0) {
      setPasswordError(true);
      error = true;
    }
    if (error) {
      return;
    }
    login(email, password);
  }, [setEmailError, setPasswordError, email, password, login]);

  const onEmailChange = useCallback(
    (text) => {
      setEmailError(false);
      setEmail(text);
    },
    [setEmailError, setEmail],
  );

  const onPasswordChange = useCallback(
    (text) => {
      setPasswordError(false);
      setPassword(text);
    },
    [setPasswordError, setPassword],
  );
  return (
    <>
      <View style={[styles.container]}>
        <TextInput label="Email" value={email} onChangeText={onEmailChange} />
        <HelperText type="error" visible={emailError}>
          Email is invalid!
        </HelperText>
        <TextInput
          secureTextEntry
          mode="flat"
          label="Password"
          value={password}
          onChangeText={onPasswordChange}
        />
        <HelperText type="error" visible={passwordError}>
          Password is invalid!
        </HelperText>
        <Button mode="contained" onPress={onSubmit}>
          Log in
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  accordion: {
    backgroundColor: appColors.primary,
    borderRadius: 6,
    color: appColors.text,
  },
  accordionFirst: {
    marginTop: 16,
  },
  accordionLast: {
    marginVertical: 16,
  },
  container: {
    backgroundColor: '#EEE',
    padding: 16,
  },
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      login: loginAdult,
    },
    dispatch,
  );

export default connect(null, mapDispatchToProps)(AuthLoginForm);
