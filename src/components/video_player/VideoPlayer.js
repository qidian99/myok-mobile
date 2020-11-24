import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import {globalStyles} from 'styles/index';
import EStyleSheet from 'react-native-extended-stylesheet';
import YoutubeVideoPlayer from './platforms/YouTubeVideoPlayer';
import VimeoVideoPlayer from './platforms/VimeoVideoPlayer';
 
const VideoPlayer = (props) => {
  const [provider, setProvider] = useState('');

  const getPlatform = () => {
    console.log('getting platform');
    if(props.url.includes('youtube') || props.url.includes('youtu.be')) {
      setProvider('youtube');
    }
    else if(props.url.includes('vimeo')) {
      setProvider('vimeo');
    }
    else {
      setProvider('unknown');
    }
  }

  useEffect(() => {
    getPlatform();
  }, [props.url]);

  return (
    provider === 'youtube' ? 
      <YoutubeVideoPlayer url={props.url} toggleComplete={props.toggleComplete}></YoutubeVideoPlayer> 
    :
    provider === 'vimeo' ?
      <VimeoVideoPlayer url={props.url} toggleComplete={props.toggleComplete}></VimeoVideoPlayer> 
    :
    provider === ''?
      <View style={globalStyles.center}>
        <Text style={styles.text}>
          Loading Video...
        </Text>
      </View>
    :
      <View style={globalStyles.center}>
        <Text style={styles.text}>
          Error Loading Video
        </Text>
      </View>
  );
};

const styles = EStyleSheet.create({
  text: {
    fontSize: 32,
    marginBottom: 16,
  },
});

export default VideoPlayer;