import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import {globalStyles} from 'styles/index';
import EStyleSheet from 'react-native-extended-stylesheet';
import { WebView } from 'react-native-webview';

const YouTubeVideoPlayer = (props) => {
  const [error, toggleError] = useState(false);
  const [videoID, setID] = useState('');
  const [ended, toggleEnded] = useState(false);

  const getID = () => {
    const regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
    const match = props.url.match(regExp);
    if (match&&match[1].length !== 11) {
      toggleError(true);
    }  
    const id = match[1];
    console.log(id);
    setID(id);
    toggleError(false);
  }

  const onEnd = () => {
    console.log('Video Ended');
    toggleEnded(true)
    props.toggleComplete();
  }

  useEffect(() => {
    getID();
  }, []);

  return (
    error ? 
      <View style={globalStyles.center}>
        <Text style={styles.text}>
          Failed to Load
        </Text> 
      </View>
    :
    videoID === '' ?
      <View style={globalStyles.center}>
        <Text style={styles.text}>
          Loading Video...
        </Text> 
      </View>
    :
      <WebView
        automaticallyAdjustContentInsets={false}
        style={styles.video}
        onMessage={(event) => {
          onEnd();
        }}

        source={{
          html: `
            <div id="player"></div>

            <script>
              var tag = document.createElement('script');

              tag.src = "https://www.youtube.com/iframe_api";
              var firstScriptTag = document.getElementsByTagName('script')[0];
              firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

              var player;
              function onYouTubeIframeAPIReady() {
                player = new YT.Player('player', {
                  videoId: '${videoID}',
                  playerVars: {
                    'controls': 0,
                    'modestbranding': 1,
                  },
                  events: {
                    'onStateChange': onPlayerStateChange
                  }
                });
              }

              function onPlayerStateChange(event) {        
                if(event.data === 0) {  
                  window.ReactNativeWebView.postMessage("End")
                }
            }
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
    width: '150%',
  },
});

export default YouTubeVideoPlayer;
