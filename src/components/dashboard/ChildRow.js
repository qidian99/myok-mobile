import React from 'react';
import {View, Text, Image} from 'react-native';

const ChildRow = ({child, colors, isLast}) => {
  const {first_name, parent_code, dob} = child;

  const {
    containerStyle,
    imageContainerStyle,
    textContainerStyle,
    titleTextStyle,
    subtitleTextStyle,
    refreshCodeContainer,
    buttonContainer,
    buttonTextStyle,
  } = styles;

  return (
    <View
      style={[
        containerStyle,
        !isLast && {borderBottomWidth: 1, borderBottomColor: '#7CB0D7'},
      ]}>
      <View style={imageContainerStyle}>
        <Image
          source={require('assets/image/child_icon.png')}
          style={{width: 26, height: 38}}
        />
      </View>
      <View style={textContainerStyle}>
        <Text
          style={[titleTextStyle, {color: colors.background}]}
          numberOfLines={1}>
          {first_name}
        </Text>
        <Text style={subtitleTextStyle} numberOfLines={1}>
          {'Parent Code \t'}
          <Text style={{fontWeight: '600'}}>{parent_code}</Text>
        </Text>
        <Text style={subtitleTextStyle} numberOfLines={1}>
          {'Date of Birth \t'}
          <Text style={{fontWeight: '600'}}>{dob}</Text>
        </Text>
      </View>
      <View style={refreshCodeContainer}>
        <View style={buttonContainer}>
          <Text style={[buttonTextStyle, {color: colors.background}]}>
            Refresh Code
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = {
  containerStyle: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  imageContainerStyle: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 1 / 8,
  },
  textContainerStyle: {
    flex: 5 / 8,
  },
  titleTextStyle: {
    fontWeight: '600',
    fontSize: 14,
  },
  subtitleTextStyle: {
    fontSize: 12,
    color: '#B9D4E4',
  },
  refreshCodeContainer: {
    flex: 1 / 4,
    justifyContent: 'center',
  },
  buttonContainer: {
    backgroundColor: '#28A885',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  buttonTextStyle: {
    fontWeight: '600',
    fontSize: 8,
  },
};

export default ChildRow;
