import React, { Component } from 'react';
import GoogleMap from './GoogleMap';
import YouTubePlayer from './YouTubePlayer';
import './BeforeSunsetApp.css';
import {db} from "../firebase";

export class BeforeSunsetApp extends Component {

  // componentWillMount() {
  //   db.collection('Films').get().then(collection => {
  //     const movieCards = collection.docs.map(doc => doc.data());
  //     this.setState({movieCards});
  //   })
  // }

  render() {
    return (
      <div>
        <div className="left-col col-sm-6 col-md-6 col-lg-6">
          <YouTubePlayer />
          <YouTubePlayer />
        </div>
        <div className="right-col col-sm-5 col-md-5 col-lg-5">
          <GoogleMap lat="48.852547" lng="2.3471197000000075"/>
        </div>
      </div>
    );
  }
}

 export default BeforeSunsetApp;
