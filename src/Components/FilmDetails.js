import React, { Component } from 'react';
// import GoogleMap from './GoogleMap';
import YouTubePlayer from './YouTubePlayer';
import './FilmDetails.css';
import {db} from "../firebase";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class FilmDetails extends Component {

  constructor (props) {
    super(props);
    this.state = {
      filmData:null,
      clipData:null,
      allClips:null
    }
  }

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


  }

  // calculateLocation() {
  //   console.log("inside function!!!");
  //   if (this.state.clipData) {
  //     console.log("state!!!!");
  //     db.collection('Films-To-Places').doc('3WscLkiiCts').get().then((doc) => {
  //       if (doc.exists) {
  //         let data = doc.data();
  //         console.log(data);
  //         return {
  //           lat:48.852547,
  //           lng:2.3471197000000075
  //         }
  //       } else {
  //         console.log("No Document in calculateLocation");
  //       }
  //     })
  //   } else {
  //     console.log("no state!!!!");
  //     return {
  //       lat:1,
  //       lng:2
  //     }
  //   }
  //
  // }

sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

  getLatLng() {
    if (this.state.clipData) {
      let thisLat = -1;
      let thisLng = -1;
      db.collection('Films-to-Places').doc('3WscLkiiCts').get().then(function(doc) {
        if (doc.exists) {
          let data = doc.data();
          let userRef = data['0-161'];
          userRef.get().then(function(place) {
            let placeData = place.data();
            thisLat = placeData.Coor[0];
            thisLng = placeData.Coor[1];
            console.log("promise resolved");
          });

        } else {
          console.log("No Document in calculateLocation");
        }
      });
      // while (thisLat==-1 || thisLng == -1) {
      //   this.sleep(1000);
      //   console.log("sleeping 100 ms");
      // }
      return [thisLat,thisLng];
    } else {
      return [49.852547,2.3471197000000075];
    }
  }

  getLng() {
    return 2.3471197000000075;
  }


  render() {
    if (this.state && this.state.filmData && this.state.allClips) {
      console.log("!!!!");
      console.log(this.state);
      console.log(this.state.allClips);
      console.log(this.state.allClips["3WscLkiiCts"]["1-161"]["_lat"]);
      console.log("!!!!");

      return (
        <div>
          <div className="left-col col-sm-6 col-md-6 col-lg-6">
            {
              this.state.filmData.clips.map((clip,i) => {
                return <YouTubePlayer videoId={clip} callback={this.fromYouTube.bind(this)}/>
              })
            }
          </div>
          <div className="right-col col-sm-5 col-md-5 col-lg-5">
            <div className="google-map-container">
              <Map  google={this.props.google}
              zoom={14}
              initialCenter={{
                lat:48.852547,
                lng:2.3471197000000075
              }}
              >
                <Marker
                title={'The marker`s title will appear as a tooltip.'}
                name={'SOMA'}
                position={{lat: this.state.allClips["3WscLkiiCts"]["1-161"]["_lat"], lng: this.state.allClips["3WscLkiiCts"]["1-161"]["_long"]}} />

                <InfoWindow onClose={this.onInfoWindowClose}>
                        <div>
                          <h1>lala</h1>
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
