import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Animated, {useSharedValue, Easing} from 'react-native-reanimated';

const Radio = ({size, color, selected}) => {
  const {unChecked} = styles;

  const [opacity] = useState(new Animated.Value(selected ? 1 : 0));

  useEffect(() => {
    let toValue = 0;
    if (selected) {
      toValue = 1;
    }
    Animated.timing(opacity, {
      toValue,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    }).start();
  }, [opacity, selected]);

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
      <Animated.View
        style={[
          {
            backgroundColor: color,
            borderRadius: size,
            width: size * 2,
            height: size * 2,
          },
          {
            opacity,
          },
        ]}
      />
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
