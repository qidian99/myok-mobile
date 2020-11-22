import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {CenterButton} from 'components/auth/AuthButton';
import {globalStyles} from 'styles/index';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loginAdult} from 'sagas/actions';
import {DRUPAL_USER, DRUPAL_PASSWORD, MODE} from '@env';

const AuthForms = ({colors, login}) => {
  const navigation = useNavigation();

  const {titleTextStyle, titleContainerStyle, introTextStyle} = styles;

  return (
    <View style={globalStyles.authCard}>
      <View style={titleContainerStyle}>
        <Text style={titleTextStyle}>Your child. Their privacy.</Text>
        <Text style={titleTextStyle}>Your control.</Text>
      </View>
      <Text style={introTextStyle}>
        Welcome to MyOk! Controlling requests made by educational and commercial
        online services, apps, games and programs has never been easier.
      </Text>
      <Text style={introTextStyle}>
        Please select one of the options to get started.
      </Text>
      <CenterButton text="Login" onPress={() => navigation.push('Login')} />
      <CenterButton
        text="Register"
        onPress={() => navigation.push('Register')}
      />
      {MODE === 'DEV' && (
        <CenterButton
          text="Admin Login"
          onPress={() => {
            login(DRUPAL_USER, DRUPAL_PASSWORD);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  introTextStyle: {
    color: '#195174',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 10,
  },
  titleContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleTextStyle: {
    color: '#195174',
    fontSize: 24,
    fontWeight: '600',
  },
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      login: loginAdult,
    },
    dispatch,
  );

export default connect(null, mapDispatchToProps)(AuthForms);
