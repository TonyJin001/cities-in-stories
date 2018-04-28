import React from 'react';
import YouTube from 'react-youtube';
import {db} from "../firebase";

class YouTubePlayer extends React.Component {

  // constructor (props) {
  //   super(props);
  //   this.state = {
  //     filmData:[]
  //   }
  // }
  //
  // componentWillMount() {
  //   const filmData = db.collection('Films').doc(this.props.dbIndex).get().then(doc => doc.data());
  //   this.setState({filmData});
  // }


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
        videoId={this.props.videoId}
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
