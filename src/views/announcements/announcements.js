import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {connect, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';

import {globalStyles} from 'styles';
import {fetchAnnouncements as fetchAnnouncementsAction} from 'sagas/actions';

import _ from 'lodash';
import AnnouncementCard from 'components/announcment/AnnouncementCard';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useTheme} from 'react-native-paper';

const Announcements = ({fetchAnnouncements, announcements}) => {
  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  const theme = useTheme();

  // console.log('announcements', announcements);

  return (
    <ScrollView contentContainerStyle={styles.root}>
      <View style={styles.container}>
        <Text style={styles.title}>Announcements</Text>

        {announcements.length > 0 ? (
          announcements.map(({id, title, body, date}) => (
            <AnnouncementCard key={id} title={title} body={body} date={date} />
          ))
        ) : (
          <View style={styles.empty}>
            {loading ? (
              <View />
            ) : (
              <Text style={{color: theme.colors.text}}>No Announcement</Text>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = EStyleSheet.create({
  root: {
    padding: 16,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  container: {
    width: '100%',
  },
  empty: {
    borderWidth: 1,
    borderColor: '#FFF',
    padding: 8,
    backgroundColor: '#2374A5',
  },
  title: {
    borderColor: '#FFF',
    borderWidth: 1,
    padding: 8,
    backgroundColor: '#195174',
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#FFF',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: 'hidden',
  },
});

const mapStateToProps = (state) => {
  return {
    announcements: state.announcement.announcements,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchAnnouncements: fetchAnnouncementsAction,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Announcements);
