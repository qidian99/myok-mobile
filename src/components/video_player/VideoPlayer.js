import React from 'react';
import YoutubeVideoPlayer from './platforms/YouTubeVideoPlayer';
import VimeoVideoPlayer from './platforms/VimeoVideoPlayer';
 
const VideoPlayer = (props) => {
  return (
    props.platform === 'Youtube' ? 
    <YoutubeVideoPlayer id={props.id}></YoutubeVideoPlayer> :
    <VimeoVideoPlayer id={props.id} toggleComplete={props.toggleComplete}></VimeoVideoPlayer>
  );
};

export default VideoPlayer;