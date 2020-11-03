import {AccordionList, Accordion} from 'components/base';
import TextInput from 'components/common/TextInput';
import React, {useCallback, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme, Button} from 'react-native-paper';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loginAction} from 'sagas/actions';
import {globalStyles} from 'styles/index';
import {appColors} from 'theme';

const AuthLoginForm = ({login}) => {
  const {colors} = useTheme();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <>
      <View style={[styles.container]}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          secureTextEntry
          mode="flat"
          label="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Button mode="contained" onPress={() => login('a', 'b')}>
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
      login: loginAction,
    },
    dispatch,
  );

export default connect(null, mapDispatchToProps)(AuthLoginForm);
