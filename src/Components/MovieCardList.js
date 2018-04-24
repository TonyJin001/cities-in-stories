import React, { Component } from 'react';
import MovieCard from './MovieCard';
import './MovieCardList.css'
import {Bootstrap, Grid, Row, Col} from 'react-bootstrap';
import {db} from "../firebase"
import {BrowserRouter, Route, Link} from "react-router-dom";

class MovieCardList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movieCards:[]
    }
  }

  componentWillMount() {
    db.collection('Films').get().then(collection => {
      const movieCards = collection.docs.map(doc => doc.data());
      this.setState({movieCards});
    })
  }

  render() {
    return (
      <div className="movie-card-list">
            {this.state.movieCards.map((card,i)=>{
              return <Link to="BeforeSunsetApp"><MovieCard title={card.title}
              year={card.year}
              imgSrc={card.imgSrc}
              director={card.director}
              genres={card.genres}
              description={card.description}
              numLocations={card.numLocations}/></Link>
            })}
      </div>

    );
  }
}

export default MovieCardList;
