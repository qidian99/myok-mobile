import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import moment from 'moment';

const AnnouncementCard = ({
  containerStyle,
  numberOfLines,
  title,
  body,
  date,
}) => {
  return (
    <View style={[styles.root, containerStyle]}>
      <View style={styles.textContainer}>
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>
        <Text numberOfLines={numberOfLines} style={styles.body}>
          {body}
        </Text>
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.date}>{moment(date).format('dddd MMM D')}</Text>
      </View>
    </View>
  );
};

AnnouncementCard.defaultProps = {
  containerStyle: {
    borderColor: '#FFFFFF',
    backgroundColor: '#2374A5',
  },
  numberOfLines: 3,
};

const styles = EStyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 1,
    padding: 12,
    width: '100%',
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 8,
    flex: 2,
  },
  dateContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  date: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    color: '#FFF',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'white',
    fontSize: '0.8rem',
  },
  title: {
    justifyContent: 'center',
    // borderWidth: 1,
    fontWeight: '600',
    color: '#FFF',
    fontSize: '1.2rem',
  },
  body: {
    paddingTop: 8,
    color: '#FFF',
    overflow: 'scroll',
    fontSize: '1rem',
  },
});

export default AnnouncementCard;
