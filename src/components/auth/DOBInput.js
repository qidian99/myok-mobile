import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DOBInput = ({date, onChange, title = 'Date of Birth'}) => {
  const {containerStyle, titleStyle, entryContainerStyle} = styles;

  return (
    <View style={containerStyle}>
      <Text style={titleStyle}>{title}</Text>
      <DateTimePicker
        style={entryContainerStyle}
        value={date}
        mode="date"
        is24Hour={true}
        onChange={onChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    marginTop: 15,
  },
  entryContainerStyle: {
    alignItems: 'center',
    backgroundColor: 'rgba(17, 78, 117, 0.1);',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  entryTextStyle: {
    color: '#2374A5',
    fontSize: 14,
  },
  inputContainerStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 3,
  },
  titleStyle: {
    color: '#195174',
    fontSize: 12,
    lineHeight: 16,
  },
});

export default DOBInput;
