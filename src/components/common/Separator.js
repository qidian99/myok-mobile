import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const Separator = ({text, textStyle}) => {
  const {
    separatorContainerStyle,
    separatorLineStyle,
    separatorTextStyle,
  } = styles;
  return (
    <View style={separatorContainerStyle}>
      <View style={separatorLineStyle} />
      <Text style={[separatorTextStyle, textStyle]}>{text}</Text>
      <View style={separatorLineStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  separatorContainerStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  separatorLineStyle: {
    backgroundColor: '#2374A5',
    flex: 1,
    height: 1,
  },
  separatorTextStyle: {
    color: '#2374A5',
    fontSize: 14,
    lineHeight: 18,
    paddingHorizontal: 10,
  },
});

export default Separator;
