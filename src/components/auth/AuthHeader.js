import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
const AuthHeader = ({title, intro}) => {
  const {titleStyle, introTextStyle} = styles;
  return (
    <View>
      {title ? <Text style={titleStyle}>{title}</Text> : null}
      <Text style={introTextStyle}>{intro}</Text>
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
  titleStyle: {
    color: '#195174',
    fontSize: 20,
    fontWeight: '600',
  },
});

export default AuthHeader;
