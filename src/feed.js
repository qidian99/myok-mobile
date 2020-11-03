import React from 'react';
import {View, Text, Platform, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Button} from 'react-native-paper';
import {globalStyles} from './styles';
import {action} from 'reducers/index';
import {actions} from 'util/actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchChildren, fetchDocuments} from 'sagas/actions';

const Feed = ({fetchDocuments, fetchChildren}) => {
  const navigation = useNavigation();
  const route = useRoute();

  // console.log(route);

  let detailResult = route.params;
  return (
    <View style={globalStyles.center}>
      <Text style={globalStyles.title}>
        {detailResult ? detailResult.title : 'Navigation Drawer'}
      </Text>
      <Button
        icon="camera"
        mode="contained"
        onPress={() => action(actions.LOGOOUT)}>
        Log out
      </Button>
      <Button icon="camera" mode="contained" onPress={() => fetchDocuments()}>
        Fetch Documents
      </Button>
      <Button icon="camera" mode="contained" onPress={() => fetchChildren()}>
        Fetch Children
      </Button>
      {Platform.select({
        ios: (
          <Button
            onPress={() =>
              navigation.navigate('Detail', {foodName: 'Detail Screen'})
            }>
            Go to Feed Item
          </Button>
        ),
        android: (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Detail', {foodName: 'Detail Screen'})
            }>
            <Text style={globalStyles.androidButtonText}>Go to FeedItem</Text>
          </TouchableOpacity>
        ),
      })}
    </View>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchDocuments,
      fetchChildren,
    },
    dispatch,
  );

export default connect(null, mapDispatchToProps)(Feed);
