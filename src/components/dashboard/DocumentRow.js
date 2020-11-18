import React from 'react';
import {View, Text, Image} from 'react-native';
import {mapDocumentTypeToIcon, mapDocumentStatus} from 'util/general';

const DocumentRow = ({document, colors, isLast}) => {
  const {
    document_type_id,
    title,
    first_name,
    inserted,
    has_responded,
    has_agreed,
  } = document;

  const {
    containerStyle,
    imageContainerStyle,
    textContainerStyle,
    titleTextStyle,
    subtitleTextStyle,
    statusContainerStyle,
    statusTextStyle,
    viewDocumentContainerStyle,
  } = styles;

  const {statusText, statusColor} = mapDocumentStatus(
    has_responded,
    has_agreed,
  );

  return (
    <View
      style={[
        containerStyle,
        !isLast && {borderBottomWidth: 1, borderBottomColor: '#7CB0D7'},
      ]}>
      <View style={imageContainerStyle}>
        <Image
          source={mapDocumentTypeToIcon(document_type_id)}
          style={{width: 30, height: 35}}
        />
      </View>
      <View style={textContainerStyle}>
        <Text
          style={[titleTextStyle, {color: colors.background}]}
          numberOfLines={1}>
          {title}
        </Text>
        <Text style={subtitleTextStyle} numberOfLines={1}>
          {`${first_name} | ${inserted}`}
        </Text>
        <View style={[statusContainerStyle, {backgroundColor: statusColor}]}>
          <Text style={[statusTextStyle, {color: colors.background}]}>
            {statusText}
          </Text>
        </View>
      </View>
      <View style={viewDocumentContainerStyle}>
        <Image
          source={require('assets/image/aup_view_icon.png')}
          style={{width: 30, height: 15}}
        />
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
    flex: 3 / 4,
  },
  titleTextStyle: {
    fontWeight: '600',
    fontSize: 14,
  },
  subtitleTextStyle: {
    fontSize: 12,
    color: '#B9D4E4',
  },
  statusContainerStyle: {
    marginTop: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 3,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    width: 65,
  },
  statusTextStyle: {
    fontWeight: '600',
    fontSize: 10,
  },
  viewDocumentContainerStyle: {
    flex: 1 / 8,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
};

export default DocumentRow;
