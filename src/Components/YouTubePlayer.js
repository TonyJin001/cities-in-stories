import React from 'react';
import YouTube from 'react-youtube';
import {db} from "../firebase";
import PropTypes from 'prop-types';
import './YouTubePlayer.css';
import {Link} from "react-router-dom";

class YouTubePlayer extends React.Component {

  constructor (props, context) {
    super(props, context);
    this._onPlay = this._onPlay.bind(this);
    this._onPause = this._onPause.bind(this);
    this.displayLocations = this.displayLocations.bind(this);
    this.intervalFunction = this.intervalFunction.bind(this);

    this.getLink = this.getLink.bind(this);

    this.state = {
      time_update_interval : null
    }
  }

  displayLocations() {
    console.log("@@@@@@@");
    console.log(this.props.locationInfo);
    console.log("@@@@@@@");
    let locationInfoArr = [];
    for (var key in this.props.locationInfo) {
      let item = this.props.locationInfo[key];
      locationInfoArr.push([item.name,item.address,item.location]);
      console.log(item);
    }
    return locationInfoArr;
  }

  getLink(location) {
    let lat = location._lat;
    let lng = location._long;
    return "https://www.google.com/maps/dir/?api=1&origin=48.867837,2.381656&destination=" + lat + "," + lng;
  }



  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0
      }
    };

    console.log(this.props.videoId);

    return (
      <div className="video-container">
        <h1 className="video-title">{this.props.videoTitle}</h1>
        <YouTube
          videoId={this.props.videoId}
          opts={opts}
          onPlay={this._onPlay}
          onPause={this._onPause}
        />
        {this.displayLocations().map((item,i)=> {
          return (
            <div className="row">
              <div className="col-sm-7 col-md-7 col-lg-7">
                      <p className="location-name"><i class="fas fa-map-marker"></i>        {item[0]}</p>
                      <p className="location-address">{item[1]}</p>
                      <Link to={this.props.route+"/"+item[0].split(" ").join("")}><p className="view-details">View Details</p></Link>
              </div>
              <div className="col-sm-5 col-md-5 col-lg-5">
                <div className="right-row">
                  <img className="iconSave" src= {process.env.PUBLIC_URL+"/Assets/map/save.jpg"} />
                  <a href= {this.getLink(item[2])}><img className="iconDirection" src= {process.env.PUBLIC_URL+"/Assets/map/direction.jpg"} /></a>
                </div>
              </div>
            </div>)
        })}

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
