import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './GoogleMap.css';

export class GoogleMap extends Component {

  constructor (props) {
    super(props);
    console.log("In GOogle Map!!!");
    console.log(this.props.lat);
  }



  render() {
    return (
      <div className="google-map-container">
      <h1>{this.props.location}</h1>
        <Map google={this.props.google}
        zoom={14}
        initialCenter={{
          lat:this.props.lat,
          lng:this.props.lng
        }}
        >
            <Marker onClick={this.onMarkerClick}
                    name={'Current location'} />

            <InfoWindow onClose={this.onInfoWindowClose}>
                <div>
                  <h1>lala</h1>
                </div>
            </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyDTFiRiF803aZHRYeob2ANjfjyWC8NlYyc")
})(GoogleMap);
