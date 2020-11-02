import React from 'react';
import {ImageBackground, View} from 'react-native';
import {Button} from 'react-native-paper';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loginAction} from 'sagas/actions';
import {styles} from 'styles/index';

const Login = ({login}) => {
  return (
    <View>
      <ImageBackground
        style={styles.background}
        source={require('../../assets/image/isafe_background.jpeg')}>
        <Button icon="camera" mode="contained" onPress={() => login('a', 'b')}>
          Log in
        </Button>
      </ImageBackground>
    </View>
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
