import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialIcons';

const DOBInput = ({title = 'Date of Birth'}) => {
  const {
    containerStyle,
    titleStyle,
    inputContainerStyle,
    entryContainerStyle,
    entryTextStyle,
  } = styles;
  return (
    <View style={containerStyle}>
      <Text style={titleStyle}>{title}</Text>
      <View style={inputContainerStyle}>
        <View style={entryContainerStyle}>
          <Text style={entryTextStyle}>Month</Text>
          <MaterialIcon name="expand-more" color="#2374A5" size={24} />
        </View>
        <View style={entryContainerStyle}>
          <Text style={entryTextStyle}>Day</Text>
          <MaterialIcon name="expand-more" color="#2374A5" size={24} />
        </View>
        <View style={entryContainerStyle}>
          <Text style={entryTextStyle}>Year</Text>
          <MaterialIcon name="expand-more" color="#2374A5" size={24} />
        </View>
      </View>
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
    paddingHorizontal: 8,
    paddingVertical: 8,
    width: '30%',
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
