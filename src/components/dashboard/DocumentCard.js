import React from 'react';
import {View, Text, Image} from 'react-native';
import {mapDocumentTypeToIcon, mapDocumentStatus} from 'util/general';

const DocumentCard = ({item, colors}) => {
  const {
    title,
    first_name,
    document_type_id,
    inserted,
    has_responded,
    has_agreed,
  } = item;

  const {
    cardContainerStyle,
    cardTopStyle,
    cardBottomStyle,
    statusContainerStyle,
    statusTextStyle,
    imageContainerStyle,
    titleTextStyle,
    viewDocumentStyle,
  } = styles;

  const {statusText, statusColor} = mapDocumentStatus(
    has_responded,
    has_agreed,
  );

  return (
    <View style={cardContainerStyle}>
      <View style={cardTopStyle}>
        <View style={imageContainerStyle}>
          <Image
            style={{width: '100%', height: '100%'}}
            source={mapDocumentTypeToIcon(document_type_id)}
            color={colors.primary}
            resizeMode={'contain'}
          />
        </View>
      </View>
      <View style={[cardBottomStyle, {backgroundColor: colors.darkBlue}]}>
        <View style={{paddingBottom: 7, marginHorizontal: 10}}>
          <Text
            numberOfLines={1}
            style={[titleTextStyle, {color: colors.background}]}>
            {title}
          </Text>
        </View>
        <Text style={[viewDocumentStyle, {color: colors.background}]}>
          VIEW
        </Text>
      </View>
      <View style={[statusContainerStyle, {backgroundColor: statusColor}]}>
        <Text style={[statusTextStyle, {color: colors.background}]}>
          {statusText}
        </Text>
      </View>
    </View>
  );
};

const styles = {
  cardContainerStyle: {
    flex: 1,
    height: 130,
    width: 179,
    marginRight: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
  cardTopStyle: {
    flex: 3 / 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#538BBD',
  },
  imageContainerStyle: {
    margin: 10,
    flex: 1,
    width: '100%',
    height: '100%',
  },
  cardBottomStyle: {
    flex: 2 / 5,
    justifyContent: 'center',
  },
  statusContainerStyle: {
    position: 'absolute',
    top: 7,
    left: 10,
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
  statusTextStyle: {
    fontWeight: '600',
    fontSize: 10,
  },
  titleTextStyle: {
    fontSize: 12,
    fontWeight: '600',
  },
  subtitleTextStyle: {
    fontSize: 10,
    color: '#759AB2',
  },
  viewDocumentStyle: {
    marginHorizontal: 10,
    marginBottom: 5,
    fontSize: 12,
    fontWeight: '600',
  },
};

export default DocumentCard;
