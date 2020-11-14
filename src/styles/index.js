/* eslint-disable react-native/sort-styles */
/* eslint-disable react-native/no-color-literals */
//import {StyleSheet} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import {appColors} from 'theme/index';

export const globalStyles = EStyleSheet.create({
  androidButtonText: {
    color: 'blue',
    fontSize: 20,
  },
  background: {
    height: '100%',
    width: '100%',
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    margin: 24,
  },
  container: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  datepicker: {
    paddingVertical: 28,
    backgroundColor: '#FCFCFC',
    marginBottom: 16,
  },
  logo: {
    marginTop: 30,
    height: 73,
    width: 200,
  },
  title: {
    fontSize: '3rem',
    marginBottom: 16,
  },

  /* Auth */
  authContainer: {
    marginTop: 16,
    paddingHorizontal: 0,
    width: '90%',
  },

  authCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 5,
    overflow: 'hidden',
    padding: 16,
  },

  rule: {
    paddingHorizontal: 0,
  },
});
