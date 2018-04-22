import React, { Component } from 'react';
import MovieCard from './MovieCard';
import './MovieCardList.css'
import {Bootstrap, Grid, Row, Col} from 'react-bootstrap';

class MovieCardList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movieCards:[
        {title:"Before Sunset",
        year:"2004", imgSrc:"https://ia.media-imdb.com/images/M/MV5BMTQ1MjAwNTM5Ml5BMl5BanBnXkFtZTYwNDM0MTc3._V1_UX182_CR0,0,182,268_AL_.jpg",
        director:"Richard Linklater",
        genres:["Set in Paris","Drama","Romance"],
        description:"Nine years after Jesse and Celine first met, they encounter each other again on the French leg of Jesse’s book tour.",
        numLocations:14},

        {title:"Paris je t'aime",
        year:"2006", imgSrc:"https://ia.media-imdb.com/images/M/MV5BMTc1MDgwNDE4MF5BMl5BanBnXkFtZTcwMTQzMzc0MQ@@._V1_UX182_CR0,0,182,268_AL_.jpg",
        director:"Various Directors",
        genres:["Set in Paris","Drama","Romance","Comedy"],
        description:"Paris, je t’aime is about the plurality of cinema in one mythic location: Paris, the City of Love. 20 filmmakers have five minutes each; the audience must weave a single narrative out of 20 moments.",
        numLocations:18}
      ]
    }
  }


  render() {
    return (
      <div className="movie-card-list">
            {this.state.movieCards.map((card,i)=>{
              return <MovieCard title={card.title}
              year={card.year}
              imgSrc={card.imgSrc}
              director={card.director}
              genres={card.genres}
              description={card.description}
              numLocations={card.numLocations}/>
            })}
      </div>

    );
  }
}

export default MovieCardList;
