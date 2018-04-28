import React, { Component } from 'react';
import GoogleMap from './GoogleMap';
import YouTubePlayer from './YouTubePlayer';
import './FilmDetails.css';
import {db} from "../firebase";

export class FilmDetails extends Component {

  constructor (props) {
    super(props);
    this.state = {
      filmData:null,
      clipData:null
    }
  }

  fromYouTube(params) {
    this.setState({
      clipData:params
    })
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
    }
      // const movieCards = collection.docs.map(doc => doc.data());
      // this.setState({movieCards});
    );
    console.log(this.state);

  }

  render() {
    if (this.state && this.state.filmData) {
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
            <GoogleMap lat="48.852547" lng="2.3471197000000075"/>
          </div>
        </div>
      );
    } else {
      return <h1>loading...</h1>
    }

  }
}

 export default FilmDetails;
