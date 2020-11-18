import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
//import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
import {globalStyles} from 'styles/index';
import EStyleSheet from 'react-native-extended-stylesheet';
 
const VimeoVideoPlayer = (props) => {
  const [videoUrl, setUrl] = useState('');
  const [error, toggleError] = useState(false);
  const [ended, toggleEnded] = useState(false);

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

  const onEnd = () => {
    console.log('Video Ended');
    toggleEnded(true)
    props.toggleComplete();
  }

  useEffect(() => {
    getUrl();
  });

  return (
    error ?
      <View style={globalStyles.center}>
        <Text style={styles.text}>
          Failed to Load
        </Text>
      </View>
    : 
      videoUrl === '' ?
        <View style={globalStyles.center}>
          <Text style={styles.text}>
            Loading...
          </Text>
        </View>
    :
      <VideoPlayer 
        source={{ uri: videoUrl }}                                    
        resizeMode='contain'
        paused
        //fullscreen
        onEnd={onEnd}
        disableFullscreen
        disableSeekbar={!ended}
        disableBack
        style={styles.video} 
      />
      
  );
};

const styles = EStyleSheet.create({
  text: {
    fontSize: 32,
    marginBottom: 16,
  },
  video: {
    margin: 10,
    height: 200,
  },
});

export default VimeoVideoPlayer;