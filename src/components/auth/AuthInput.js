import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const AuthInput = ({
  title,
  value,
  hint,
  onChangeText = () => {},
  secureTextEntry,
}) => {
  const {containerStyle, titleStyle, inputContainerStyle, inputStyle} = styles;
  return (
    <View style={containerStyle}>
      <Text style={titleStyle}>{title}</Text>
      <View style={inputContainerStyle}>
        <TextInput
          value={value}
          placeholder={hint}
          onChangeText={onChangeText}
          style={inputStyle}
          placeholderTextColor="#2374A5"
          autoCapitalize="none"
          secureTextEntry={secureTextEntry}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    marginTop: 15,
  },
  inputContainerStyle: {
    backgroundColor: 'rgba(17, 78, 117, 0.1);',
    borderRadius: 4,
    marginTop: 3,
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  inputStyle: {
    color: '#2374A5',
    fontSize: 14,
  },
  titleStyle: {
    color: '#195174',
    fontSize: 12,
    lineHeight: 16,
  },
});

export default AuthInput;
