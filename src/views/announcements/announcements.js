import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, ScrollView, RefreshControl} from 'react-native';
import {connect, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';
import DocumentDetails from './../documents/documentDetails';
import {globalStyles} from 'styles';
import {fetchAnnouncements as fetchAnnouncementsAction} from 'sagas/actions';

import _ from 'lodash';
import AnnouncementCard from 'components/announcment/AnnouncementCard';
import EStyleSheet from 'react-native-extended-stylesheet';
import {ActivityIndicator, useTheme} from 'react-native-paper';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

// const Announcements = () => (
//   // <View style={globalStyles.center}>
//   //   <Text style={globalStyles.title}>Announcements</Text>
//   // </View>
//   <DocumentDetails/>
// );

const Announcements = ({fetchAnnouncements, loading, announcements}) => {
  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  const theme = useTheme();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  useEffect(() => {
    if (!loading) {
      setRefreshing(false);
    }
  }, [loading]);

  // console.log('announcements', announcements);
  // const bottomHeight = useBottomTabBarHeight();

  return (
    <View style={styles.root}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Announcements</Text>
      </View>
      <ScrollView
        style={{marginBottom: 40}}
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl
            style={{backgroundColor: theme.colors.primary}}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
        {announcements.length > 0 ? (
          announcements.map(({id, title, body, date}) => (
            <AnnouncementCard key={id} title={title} body={body} date={date} />
          ))
        ) : (
          <View style={styles.empty}>
            {loading || !refreshing ? (
              <ActivityIndicator
                style={styles.loading}
                size="small"
                color="#FFF"
              />
            ) : (
              <Text style={{color: theme.colors.text}}>No Announcement</Text>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = EStyleSheet.create({
  root: {
    padding: 16,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    // paddingBottom: 40,
  },
  titleContainer: {
    width: '100%',
  },
  empty: {
    borderWidth: 1,
    borderColor: '#FFF',
    padding: 8,
    backgroundColor: '#2374A5',
  },
  loading: {
    padding: 16,
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
    loading: state.announcement.loading,
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
