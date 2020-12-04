import React from 'react';
import {useTheme, TextInput as TextInputBase} from 'react-native-paper';
import {isAndroid} from 'util/general';

const TextInput = (props) => {
  const {colors} = useTheme();
  return (
    <TextInputBase
      {...props}
      style={[props.style, isAndroid && {paddingVertical: 0}]}
      theme={{colors: {text: colors.accent}}}
    />
  );
};

export default TextInput;
