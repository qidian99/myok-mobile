import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {Button} from 'react-native-paper';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  sendVerificationCode as sendVerificationCodeAction,
  logout as logoutAction,
} from 'sagas/actions';
import {globalStyles} from 'styles/index';
import {OTP_METHODS} from 'util/actions';

const Dev = ({sendVerificationCode, logout}) => {
  return (
    <View style={[globalStyles.container, {padding: 16}]}>
      <Button onPress={logout}>
        <Text>Log Out</Text>
      </Button>
      <Button
        onPress={() => {
          sendVerificationCode(OTP_METHODS.EMAIL, 'test@test.com');
        }}>
        <Text>Send Verification Code</Text>
      </Button>
    </View>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      sendVerificationCode: sendVerificationCodeAction,
      logout: logoutAction,
    },
    dispatch,
  );

export default connect(null, mapDispatchToProps)(Dev);
