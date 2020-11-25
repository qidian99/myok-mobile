import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import {globalStyles} from 'styles/index';
import EStyleSheet from 'react-native-extended-stylesheet';
import { WebView } from 'react-native-webview';
 
const VimeoVideoPlayer = (props) => {
  const onEnd = () => {
    console.log('Video Ended');
    props.toggleComplete();
  }

  const onSeek = () => {
    alert("do not skip the video");
  }

  return (
    <WebView
      automaticallyAdjustContentInsets={false}
      style={styles.video}
      onMessage={(event) => {
        switch(event.nativeEvent.data) {
          case "End": onEnd();
          case "Seek": onSeek();
        }
      }}
      source={{
        html: `
          <div id="player"></div>

          <script src="https://player.vimeo.com/api/player.js"></script>
          <script>
            var options = {
              url: '${props.url}',
              responsive: true,
            };

            var videoPlayer = new Vimeo.Player('player', options);
            var time = 0;

            videoPlayer.on('ended', function() {
              window.ReactNativeWebView.postMessage("End");
            });

            videoPlayer.on('seeked', function(data) {
              if(data.seconds > time) {
                videoPlayer.setCurrentTime(time);
                window.ReactNativeWebView.postMessage("Seek");
              }
            });

            videoPlayer.on('timeupdate', function(data) {
              if (data.seconds < time + 1 && data.seconds > time) {
                time = data.seconds;
              }
            });
          
          </script>`
      }}
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
    //width: '100%',
  },
});

export default VimeoVideoPlayer;