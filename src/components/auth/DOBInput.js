import React, {useState} from 'react';
import {View, Text, StyleSheet, Platform, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DOBInput = ({date, onChange, title = 'Date of Birth'}) => {
  const {containerStyle, titleStyle, entryContainerStyle} = styles;
  const [show, setShow] = useState(false);

  const showOverlay = () => {
    setShow(true);
  };

  const hideOverlay = () => {
    setShow(false);
  };

  return Platform.OS === 'ios' ? (
    <View style={containerStyle}>
      <Text style={titleStyle}>{title}</Text>
      <DateTimePicker
        style={entryContainerStyle}
        value={date}
        mode="date"
        is24Hour={true}
        onChange={onChange}
        // display="calendar"
      />
    </View>
  ) : (
    <View style={containerStyle}>
      <Text style={titleStyle}>{title}</Text>
      <TouchableOpacity onPress={showOverlay}>
        <Text>{date.toDateString()}</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          style={entryContainerStyle}
          value={date}
          mode="date"
          is24Hour={true}
          onChange={(event, selectedDate) => {
            hideOverlay();
            onChange(event, selectedDate);
          }}
          display="calendar"
        />
      )}
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
  entryStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    width: '100%',
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
