import React from 'react';
import YouTube from 'react-youtube';

class YouTubePlayer extends React.Component {
  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0
      }
    };

    return (
      <YouTube
        videoId="3WscLkiiCts"
        opts={opts}
        onReady={this._onReady}
      />
    );
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    // event.target.pauseVideo();
    let time_update_interval = setInterval(function() {
      console.log(event.target.getCurrentTime());
    },1000)
  }
}

export default YouTubePlayer;
