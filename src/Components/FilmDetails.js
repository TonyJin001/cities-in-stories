import React, { Component } from 'react';
// import GoogleMap from './GoogleMap';
import YouTubePlayer from './YouTubePlayer';
import './FilmDetails.css';
import {db} from "../firebase";
import NavBar from './NavBar';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

import { withGoogleMap, GoogleMap } from 'react-google-maps';

export class FilmDetails extends Component {

  constructor (props) {
    super(props);
    this.state = {
      filmData:null,
      clipData:null,
      allClips:null,
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    }
    this.myMap = React.createRef();
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  fromYouTube(params) {
      this.setState({
        clipData:params
      })
    console.log(params);
  }

  componentWillMount() {
    db.collection('Films').doc(this.props.dbIndex).get().then((doc) => {
      if(doc.exists) {
        let data = doc.data();
        this.setState({filmData:data});
        console.log(data);
      } else {
        console.log("No document");
      }
    })

    let self = this;
    db.collection('Films').doc(this.props.dbIndex).collection('Clips').get().then(function(querySnapshot) {
      let allClipsData = {};
      querySnapshot.forEach(function(doc) {
        let docId = doc.id;
        let docData = doc.data();
        allClipsData[docId] = docData;
      })
      self.setState({allClips:allClipsData});
    })

    // const DirectionsService = new this.props.google.maps.DirectionsService();
    // let DirectionsDisplay = new this.props.google.maps.DirectionsRenderer();
    // if (this.myMap.current != null) {
    //   console.log(this.myMap.current);
    // } else {
    //   console.log("MAP NULLLLL");
    // }
    //
    // DirectionsDisplay.setMap(this.myMap.current);
    //
    //   DirectionsService.route({
    //     origin: new this.props.google.maps.LatLng(48.85661400000001, 2.3522219000000177),
    //     destination: new this.props.google.maps.LatLng(48.857, 2.3522219000000177),
    //     travelMode: this.props.google.maps.TravelMode.DRIVING,
    //   }, (result, status) => {
    //     if (status === this.props.google.maps.DirectionsStatus.OK) {
    //       DirectionsDisplay.setDirections(result);
    //       console.log("map OKK");
    //     } else {
    //       console.error(`error fetching directions ${result}`);
    //     }
    //   });




  }


  getLatLng() {
    if (this.state.clipData) {
      let currentTime = this.state.clipData.time;
      let allTimeToClips = this.state.allClips[this.state.clipData.ID];
      for (var key in allTimeToClips) {
        let startTime = key.split("-")[0];
        let endTime = key.split("-")[1];
        if (currentTime<=endTime && currentTime>= startTime) {
          console.log(allTimeToClips[key]['location']);
          return [allTimeToClips[key]['location']['_lat'],allTimeToClips[key]['location']['_long']];
        }
      }
      return [48.85661400000001,2.3522219000000177];
    } else {
      return [48.85661400000001,2.3522219000000177];
    }
  }

  getPlaceInfo() {
    if (this.state.clipData) {
      let currentTime = this.state.clipData.time;
      let allTimeToClips = this.state.allClips[this.state.clipData.ID];
      for (var key in allTimeToClips) {
        let startTime = key.split("-")[0];
        let endTime = key.split("-")[1];
        if (currentTime<=endTime && currentTime>= startTime) {
          return [allTimeToClips[key]['name'],allTimeToClips[key]['address']];
        }
      }
      return ["Paris",""];
    } else {
      return ["Paris",""];
    }
  }

  render() {

    // if (this.myMap.current != null) {
    //   console.log(this.myMap.current);
    // } else {
    //   console.log("MAP NULLLLL");
    // }


    if (this.state && this.state.filmData && this.state.allClips) {

      return (
        <div>
          <NavBar pageTitle={this.props.title}/>
          <div className="left-col col-sm-6 col-md-6 col-lg-6">
            <p className="film-heading">
              <span className="film-title">{this.state.filmData.title}  </span>
              <span className="film-year">({this.state.filmData.year})</span>
            </p>
            <p className="film-sub-heading">
              <span className="film-director">by {this.state.filmData.director}</span>
            </p>
            <div>
              {this.state.filmData.genres.map((genre,i)=>{
                return (
                  <div className="tags-container">
                    <p className="tag">{genre}</p>
                  </div>
                )
              })}
            </div>
            <p className="film-description">{this.state.filmData.description}</p>
            <hr />
            {
              this.state.filmData.clips.map((clip,i) => {
                return <YouTubePlayer videoId={clip.ID} videoTitle={clip.Title} callback={this.fromYouTube.bind(this)} locationInfo={this.state.allClips[clip.ID]} route={this.props.route}/>
              })
            }
          </div>
          <div className="right-col col-sm-5 col-md-5 col-lg-5">
            <div className="google-map-container">
              <Map  ref={this.myMap} google={this.props.google}
              zoom={14}
              initialCenter={{
                lat:48.85661400000001,
                lng:2.3522219000000177
              }}
              onClick={this.onMapClicked}
              >
                <Marker
                title={'The marker`s title will appear as a tooltip.'}
                name={'SOMA'}
                position={{lat: this.getLatLng()[0], lng: this.getLatLng()[1]}} onClick={this.onMarkerClick}/>

                <InfoWindow
                  marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
                    <div>
                      <p>{this.getPlaceInfo()[0]}</p>
                      <p>{this.getPlaceInfo()[1]}</p>
                    </div>
                </InfoWindow>
              </Map>
            </div>
          </div>
        </div>
      );
    } else {
      return <h1>loading...</h1>
    }

  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyDTFiRiF803aZHRYeob2ANjfjyWC8NlYyc")
})(FilmDetails);
