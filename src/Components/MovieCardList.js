import React, { Component } from 'react';
import MovieCard from './MovieCard';

class MovieCardList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movieCards:[
        {title:"Before Sunset",
        year:"2004", imgSrc:"https://ia.media-imdb.com/images/M/MV5BMTQ1MjAwNTM5Ml5BMl5BanBnXkFtZTYwNDM0MTc3._V1_UX182_CR0,0,182,268_AL_.jpg",director:"Richard Linklater"},
        {title:"Paris je t'aime",
        year:"2006", imgSrc:"https://ia.media-imdb.com/images/M/MV5BMTQ1MjAwNTM5Ml5BMl5BanBnXkFtZTYwNDM0MTc3._V1_UX182_CR0,0,182,268_AL_.jpg",director:"Various Directors"}
      ]
    }
  }


  render() {
    return (
      <div className="movie-cards-list">
        {this.state.movieCards.map((card,i)=>{
          return <MovieCard title={card.title}
          year={card.year}
          imgSrc={card.imgSrc}
          director={card.director}/>
        })}
      </div>
    );
  }
}

export default MovieCardList;
