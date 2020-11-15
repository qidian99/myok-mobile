import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';

const Radio = ({size, color, selected}) => {
  const {unChecked} = styles;
  return (
    <View
      style={[
        unChecked,
        {
          borderRadius: size * 2,
          width: size * 4,
          height: size * 4,
          borderWidth: 2,
          borderColor: color,
        },
      ]}>
      {selected ? (
        <View
          style={{
            backgroundColor: color,
            borderRadius: size,
            width: size * 2,
            height: size * 2,
          }}
        />
      ) : null}
    </View>
  );
};

const RadioButton = ({
  text,
  color = '#1554F6',
  size = 5,
  selected = false,
  onPress = () => {},
}) => {
  const {radioButtonContainerStyle, textStyle} = styles;
  return (
    <TouchableOpacity
      activeOpacity={1.0}
      style={radioButtonContainerStyle}
      onPress={onPress}>
      <Radio color={color} size={size} selected={selected} />
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  radioButtonContainerStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  textStyle: {
    color: '#195174',
    fontSize: 14,
    marginLeft: 10,
  },
  unChecked: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RadioButton;
