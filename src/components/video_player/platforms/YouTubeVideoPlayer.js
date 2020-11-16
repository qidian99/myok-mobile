import React, {useState} from 'react';
import {Text, View} from 'react-native';
import YouTube from 'react-native-youtube';
import {globalStyles} from 'styles/index';
import EStyleSheet from 'react-native-extended-stylesheet';

const YouTubeVideoPlayer = (props) => {
  const [error, toggleError] = useState(false);

  return (
    <View style={globalStyles.center}>
      {
        error ? 
          <Text style={styles.text}>
            Failed to Load
          </Text> 
        :
          <YouTube
            style={styles.video}
            apiKey='AIzaSyCLYcS8Up9t78TeXyLdIc57j37Ynp5X5pg'
            videoId={props.id} 
            onError={(e) => {console.log(e); toggleError(true)}}
            fullscreen
          />  
      }    
    </View>
  );
};

const styles = EStyleSheet.create({
  text: {
    fontSize: 32,
    marginBottom: 16,
  },
  video: {
    position: 'absolute',
    top: 40,
    left: 0,
    bottom: 40,
    right: 0,
  },
});

export default YouTubeVideoPlayer;
