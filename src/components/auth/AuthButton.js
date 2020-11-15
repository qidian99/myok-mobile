import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialIcons';

const GotoButton = ({text, onPress = () => {}}) => {
  const {gotoButtonContainerStyle, gotoButtonTextStyle} = styles;
  return (
    <TouchableOpacity
      style={gotoButtonContainerStyle}
      activeOpacity={0.8}
      onPress={onPress}>
      <Text style={gotoButtonTextStyle}>{text}</Text>
      <MaterialIcon name="keyboard-arrow-right" size={20} color="#2374A5" />
    </TouchableOpacity>
  );
};

const CenterButton = ({text, onPress = () => {}, disabled = false}) => {
  const {centerButtonContainerStyle, centerButtonTextStyle} = styles;
  return (
    <TouchableOpacity
      style={[
        centerButtonContainerStyle,
        {backgroundColor: disabled ? '#707070' : '#2374A5'},
      ]}
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}>
      <Text style={centerButtonTextStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  centerButtonContainerStyle: {
    alignItems: 'center',
    backgroundColor: '#2374A5',
    borderRadius: 5,
    justifyContent: 'center',
    marginTop: 15,
    overflow: 'hidden',
    padding: 10,
  },
  centerButtonTextStyle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  gotoButtonContainerStyle: {
    alignItems: 'center',
    backgroundColor: '#B9D4E4',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    overflow: 'hidden',
    padding: 10,
  },
  gotoButtonTextStyle: {
    color: '#2374A5',
    fontSize: 16,
    fontWeight: '600',
  },
});

export {GotoButton, CenterButton};
