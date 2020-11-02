import React from 'react';
import {View, Text, Platform, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Button} from 'react-native-paper';
import {styles} from './styles';
import {action} from 'reducers/index';
import {types} from 'util/types';

const Feed = () => {
  const navigation = useNavigation();
  const route = useRoute();

  console.log(route);

  let detailResult = route.params;
  return (
    <View style={styles.center}>
      <Text style={styles.title}>
        {detailResult ? detailResult.title : 'Navigation Drawer'}
      </Text>
      <Button
        icon="camera"
        mode="contained"
        onPress={() => action(types.LOGOOUT)}>
        Log out
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
            <Text style={styles.androidButtonText}>Go to FeedItem</Text>
          </TouchableOpacity>
        ),
      })}
    </View>
  );
};

export default Feed;
