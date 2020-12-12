import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import {isAndroid} from 'util/general';

const AuthInput = ({
  title,
  value,
  hint,
  onChangeText = () => {},
  secureTextEntry = false,
  picker = false,
  dropdown = false,
  items = [],
}) => {
  const {
    containerStyle,
    titleStyle,
    inputContainerStyle,
    inputStyle,
    placeholder,
    inputIOS,
    inputAndroid,
  } = styles;
  return (
    <View style={containerStyle}>
      <Text style={titleStyle}>{title}</Text>
      {dropdown ? (
        <DropDownPicker
          items={items}
          zIndex={10000}
          defaultValue={value}
          containerStyle={{
            backgroundColor: 'rgba(17, 78, 117, 0.1);',
            borderRadius: 4,
            marginTop: 3,
            padding: 0,
          }}
          style={{
            backgroundColor: 'transparent',
            margin: 0,
            padding: 0,
          }}
          arrowColor="#2374A5"
          arrowSize={16}
          labelStyle={{
            color: '#2374A5',
            fontSize: 14,
            margin: 0,
            padding: 0,
          }}
          itemStyle={{
            justifyContent: 'flex-start',
            margin: 0,
            padding: 0,
          }}
          dropDownStyle={{backgroundColor: '#fafafa'}}
          onChangeItem={onChangeText}
          searchable={true}
          searchablePlaceholder="Search for an item"
          searchablePlaceholderTextColor="gray"
          seachableStyle={{}}
          searchableError={() => <Text>Not Found</Text>}
        />
      ) : (
        <View style={inputContainerStyle}>
          {picker ? (
            <RNPickerSelect
              onValueChange={onChangeText}
              items={items}
              style={{placeholder, inputIOS, inputAndroid}}
              placeholder={{label: hint}}
              Icon={() => {
                return (
                  <MaterialIcon name="expand-more" size={20} color="#2374A5" />
                );
              }}
            />
          ) : (
            <TextInput
              value={value}
              placeholder={hint}
              onChangeText={onChangeText}
              style={[isAndroid && {paddingVertical: 0}, inputStyle]}
              placeholderTextColor="#2374A5"
              autoCapitalize="none"
              secureTextEntry={secureTextEntry}
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    marginTop: 15,
  },
  inputAndroid: {
    color: '#2374A5',
    fontSize: 14,
  },
  inputContainerStyle: {
    backgroundColor: 'rgba(17, 78, 117, 0.1);',
    borderRadius: 4,
    marginTop: 3,
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  inputIOS: {
    color: '#2374A5',
    fontSize: 14,
  },
  inputStyle: {
    color: '#2374A5',
    fontSize: 14,
  },
  placeholder: {
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
