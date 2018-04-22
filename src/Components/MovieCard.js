import React, { Component } from 'react';
import './MovieCard.css';
import {Bootstrap, Grid, Row, Col} from 'react-bootstrap';

class MovieCard extends Component {
  render() {
    return (
      <div className="movie-card">
        <div className="row">
          <div className="col-xs-4 col-md-4 col-lg-4">
            <img className="movie-poster img-responsive" src={this.props.imgSrc}/>
          </div>
          <div className="film-information col-xs-8 col-md-8 col-lg-8">
              <p className="film-heading">
                <span className="film-title">{this.props.title}  </span>
                <span className="film-year">({this.props.year})</span>
              </p>
              <p className="film-sub-heading">
                <span className="film-director">by {this.props.director}</span>
              </p>
              <div>
                {this.props.genres.map((genre,i)=>{
                  return (
                    <div className="tags-container">
                      <p className="tag">{genre}</p>
                    </div>
                  )
                })}
              </div>
              <p className="film-description">{this.props.description}</p>
              <p className="film-num-locations"><i class="fas fa-map-marker"></i>        {this.props.numLocations} locations in Paris</p>
          </div>
        </div>

      </div>
    );
  }
}

export default MovieCard;
