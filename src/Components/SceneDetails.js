import React, { Component } from 'react';
import YouTubePlayer from './YouTubePlayer';
import YouTube from 'react-youtube';
import './SceneDetails.css';
import {db} from "../firebase";
import NavBar from './NavBar';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

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

  render() {

    const opts = {
      height: '328',
      width: '580',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0
      }
    };

    if (this.state && this.state.placeData && this.state.videoId) {
      return (
        <div>
          <NavBar pageTitle={this.props.title} />
          <div className="row">
            <div className="left-col2 col-sm-6 col-md-6 col-lg-6">
              <p className="title">{this.state.placeData.name}</p>
              <p className="description">{this.state.placeData.description}</p>
              <p className="sub-title">Scene in {this.props.film}</p>
              <YouTube
                videoId={this.state.videoId}
                opts={opts}
              />
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

          <div className="row second-row">
            <div className="left-col2 col-sm-6 col-md-6 col-lg-6">
              <p className="sub-title">In {this.props.film}</p>
              <img className="img-responsive" src={this.getPicture(this.props.dbIndex,"Film","1")} />
              <img className="img-responsive" src={this.getPicture(this.props.dbIndex,"Film","2")} />
            </div>

            <div className="right-col2 col-sm-5 col-md-5 col-lg-5">
              <p className="sub-title">In Reality</p>
              <img  src={this.getPicture(this.props.dbIndex,"Reality","1")} />
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
