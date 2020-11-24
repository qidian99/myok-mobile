import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import {globalStyles} from 'styles/index';
import EStyleSheet from 'react-native-extended-stylesheet';

import {WebView} from 'react-native-webview';

const VimeoVideoPlayer = (props) => {
  const [videoUrl, setUrl] = useState('');
  const [error, toggleError] = useState(false);
  const [ended, toggleEnded] = useState(false);

  const onEnd = () => {
    console.log('Video Ended');
    toggleEnded(true);
    props.toggleComplete();
  };

  useEffect(() => {
    async function getUrl() {
      fetch(`https://vimeo.com/api/oembed.json?url=${props.url}`)
        .then((res) => res.json())
        .then((res) => {
          fetch(`https://player.vimeo.com/video/${res.video_id}/config`)
            .then((response) => response.json())
            .then((data) => {
              setUrl(
                data.request.files.hls.cdns[data.request.files.hls.default_cdn]
                  .url,
              );
              toggleError(false);
            })
            .catch((err) => {
              toggleError(true);
              console.error('Error: ', err);
            });
        })
        .catch((err) => {
          toggleError(true);
          console.error('Error: ', err);
        });
    }
    getUrl();
  }, [props.url]);

  return error ? (
    <View style={globalStyles.center}>
      <Text style={styles.text}>Failed to Load</Text>
    </View>
  ) : videoUrl === '' ? (
    <View style={globalStyles.center}>
      <Text style={styles.text}>Loading Video...</Text>
    </View>
  ) : (
    <VideoPlayer
      source={{uri: videoUrl}}
      resizeMode="contain"
      paused
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
    height: 196,
  },
});

export default VimeoVideoPlayer;
