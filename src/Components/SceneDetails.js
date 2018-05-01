import React, { Component } from 'react';
import YouTubePlayer from './YouTubePlayer';
import YouTube from 'react-youtube';
import './SceneDetails.css';
import {db} from "../firebase";
import NavBar from './NavBar';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import ReactStreetview from 'react-streetview';
import {Link} from "react-router-dom";

export class SceneDetails extends Component {

  constructor (props) {
    super(props);
    this.state = {
      placeData:null,
      videoId:null
    }
  }


  componentWillMount() {
    db.collection('Places').doc(this.props.dbIndex).get().then((doc) => {
      if(doc.exists) {
        let data = doc.data();
        this.setState({placeData:data});
        console.log(data);
      } else {
        console.log("No document");
      }
    })


    let self = this;
    db.collection('Places').doc(this.props.dbIndex).collection('Films').doc(this.props.filmIndex).get().then((doc)=> {
      if (doc.exists) {
        let data = doc.data().clip;
        this.setState({videoId:data});
      } else {
        console.log("no video id");
      }
    })


  }

  getPicture(placeName, filmOrReality, index) {
    console.log(process.env.PUBLIC_URL+"/Assets/"+ placeName +"/" + filmOrReality +"/"+index+".jpg")
    return process.env.PUBLIC_URL+"/Assets/"+ placeName +"/" + filmOrReality +"/"+index+".jpg";
  }

  getPageTitle () {
    return this.props.title + " in " + this.props.film;
  }

  getLink() {
    return "https://www.google.com/maps/dir/?api=1&origin=48.867837,2.381656&destination="+this.props.lat+","+this.props.lng;
  }


  render() {

    const opts = {
      height: '328',
      width: '580',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0
      }
    };

    const googleMapsApiKey = 'AIzaSyDTFiRiF803aZHRYeob2ANjfjyWC8NlYyc';

        // see https://developers.google.com/maps/documentation/javascript/3.exp/reference#StreetViewPanoramaOptions
    let streetViewPanoramaOptions = {
            position: {lat:48.84954693281445,lng:2.358547578532267},
            pov: {heading: 300, pitch: 0},
            zoom: 1
    };

    if (this.state && this.state.placeData && this.state.videoId) {
      return (
        <div>
          <NavBar pageTitle={this.getPageTitle()}/>
          <div className="row">
            <div className="left-col2 col-sm-6 col-md-6 col-lg-6">
              <div className="left-row2 col-sm-8 col-md-8 col-lg-8">
                <p className="title">{this.state.placeData.name}</p>
              </div>

              <div className="col-sm-4 col-md-4 col-lg-4">
                <div className="right-row2">
                  <img className="iconSave2" src= {process.env.PUBLIC_URL+"/Assets/map/save.jpg"} />
                  <a href= {this.getLink()}><img className="iconDirection2" src= {process.env.PUBLIC_URL+"/Assets/map/direction.jpg"} /></a>
                </div>
              </div>

              <p className="description">{this.state.placeData.description}</p>
              <p className="sub-title">Scene in {this.props.film}</p>
              <div className="youtube-wrapper">
                <YouTube
                  videoId={this.state.videoId}
                  opts={opts}
                />
              </div>
            </div>

            <div className="right-col2 col-sm-5 col-md-5 col-lg-5">
              <div className="google-map-container">
                <Map  google={this.props.google}
                zoom={14}
                initialCenter={{
                  lat:this.props.lat,
                  lng:this.props.lng
                }}
                >
                  <Marker
                  title={'The marker`s title will appear as a tooltip.'}
                  name={'SOMA'}
                  position={{lat: this.props.lat, lng: this.props.lng}} />

                  <InfoWindow
                    visible={true} position={{lat: 48.852547, lng: 2.3471197000000075}}>
                      <div>
                        <h1>lala</h1>
                      </div>
                  </InfoWindow>
                </Map>
              </div>
            </div>
          </div>

          <div className="row bottom-row">
            <div className="left-col2 col-sm-6 col-md-6 col-lg-6">
              <p className="sub-title">In {this.props.film}</p>
              <img className="img-responsive" src={this.getPicture(this.props.dbIndex,"Film","1")} />
              <img className="img-responsive" src={this.getPicture(this.props.dbIndex,"Film","2")} />
            </div>

            <div className="right-col2 col-sm-5 col-md-5 col-lg-5">
              <p className="sub-title">In Reality</p>
              <img  src={this.getPicture(this.props.dbIndex,"Reality","1")} />
              <div className="react-street-view-wrapper">
                <ReactStreetview
                      apiKey={googleMapsApiKey}
                      streetViewPanoramaOptions={streetViewPanoramaOptions}
                />
              </div>
            </div>
          </div>


          <div className="row bottom-row2">
            <div className="left-col2 col-sm-6 col-md-6 col-lg-6">
              <p className="title">{this.props.title} in Other Media</p>
              <br />

              <div className="other-film-info col-sm-7 col-md-7 col-lg-7">
                <p className="film-heading">
                  <span className="sub-title">{this.props.otherFilm}  </span>
                  <span className="sub-title-year">({this.props.otherFilmYear})</span>
                </p>
                <p className="film-sub-heading">
                  <span className="film-director">by {this.props.otherFilmDirector}</span>
                </p>
              </div>
              <div className="col-sm-5 col-md-5 col-lg-5">
                <div className="other-film-right-row">
                  <Link to={"/"+this.props.otherFilm.split(" ").join("")}><p className="view-details">View Film Details</p></Link>
                </div>
              </div>

              <br />
              <div className="youtube-wrapper">
                <YouTube
                  videoId={this.props.otherFilmId}
                  opts={opts}
                />
              </div>
              <p className="other-film-view-details">View Scene Details</p>
            </div>

            <div className="right-col2 col-sm-5 col-md-5 col-lg-5">
            </div>

          </div>

        </div>
      )
    } else {
      return <p>Loading...</p>
    }

  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyDTFiRiF803aZHRYeob2ANjfjyWC8NlYyc")
})(SceneDetails);
