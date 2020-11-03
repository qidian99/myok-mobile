import React from 'react';
import {useTheme, TextInput as TextInputBase} from 'react-native-paper';

const TextInput = (props) => {
  const {colors} = useTheme();
  return <TextInputBase {...props} theme={{colors: {text: colors.accent}}} />;
};

export default TextInput;
