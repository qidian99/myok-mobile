/* eslint-disable react-native/sort-styles */
/* eslint-disable react-native/no-color-literals */
import {StyleSheet} from 'react-native';
import {appColors} from 'theme';

export const globalStyles = StyleSheet.create({
  androidButtonText: {
    color: 'blue',
    fontSize: 20,
  },
  background: {
    height: '100%',
    width: '100%',
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
  logo: {
    height: 100,
    width: 240,
  },
  title: {
    fontSize: 36,
    marginBottom: 16,
  },

  /* Auth */
  authContainer: {
    marginTop: 16,
    paddingHorizontal: 0,
    width: '90%',
  },
});
