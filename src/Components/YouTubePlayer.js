import React from 'react';
import YouTube from 'react-youtube';
import {db} from "../firebase";
import PropTypes from 'prop-types';
import './YouTubePlayer.css';

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



  constructor (props, context) {
    super(props, context);
    this._onPlay = this._onPlay.bind(this);
    this._onPause = this._onPause.bind(this);
    this.displayLocations = this.displayLocations.bind(this);
    this.intervalFunction = this.intervalFunction.bind(this);

    this.state = {
      time_update_interval : null
    }
  }

  displayLocations() {
    for (var key in this.props.locationInfo) {
      let item = this.props.locationInfo[key];
      console.log(item);
      return (
        <div>
          <p className="location-name"><i class="fas fa-map-marker"></i>        {item.name}</p>
          <p className="location-address">{item.address}</p>
        </div>)
    }
  }

  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0
      }
    };

    console.log(this.props.locationInfo);

    return (
      <div className="video-container">
        <h1 className="video-title">{this.props.videoTitle}</h1>
        <YouTube
          videoId={this.props.videoId}
          opts={opts}
          onPlay={this._onPlay}
          onPause={this._onPause}
        />
        {this.displayLocations()}
        <br />
        <br />
        <hr />
      </div>
    );
  }

  _onPlay(event) {
    // access to player in all event handlers via event.target
    // event.target.pauseVideo();
    this.state.time_update_interval = setInterval(this.intervalFunction,1000,event.target);
  }

  _onPause(event) {
    clearInterval(this.state.time_update_interval);
    this.state.time_update_interval = null;
  }

  intervalFunction (target) {
    let thisId = this.props.videoId;
    let videoToTime = {
      ID: thisId,
      time: target.getCurrentTime()
    }

    this.props.callback(videoToTime);
  }

}

YouTubePlayer.protoTypes = {
  callback: PropTypes.func,
}

export default YouTubePlayer;
