import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import Video from 'react-native-video';
import {globalStyles} from 'styles/index';
import EStyleSheet from 'react-native-extended-stylesheet';
 
const VimeoVideoPlayer = (props) => {
  const [videoUrl, setUrl] = useState('');
  const [error, toggleError] = useState(false);

  async function getUrl() {
    fetch(`https://player.vimeo.com/video/${props.id}/config`)
      .then(res => res.json())
      .then(res => {
        setUrl(res.request.files.hls.cdns[res.request.files.hls.default_cdn].url);
        toggleError(false);
      })
      .catch((error) => {
        toggleError(true);
        console.error('Error: ', error);
      });
  }

  useEffect(() => {
    getUrl();
  });

  return (
    <View style={globalStyles.center}>
      {
        error ?
          <Text style={styles.text}>
            Failed to Load
          </Text>
        : 
          videoUrl === '' ?
          <Text style={styles.text}>
            Loading...
          </Text> 
        :
          <Video 
            source={{ uri: videoUrl }}                                    
            resizeMode='contain'
            fullscreen
            controls      
            style={styles.video} 
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
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default VimeoVideoPlayer;