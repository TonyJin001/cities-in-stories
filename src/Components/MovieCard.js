import React, { Component } from 'react';
import './MovieCard.css';
import {Bootstrap, Grid, Row, Col} from 'react-bootstrap';

class MovieCard extends Component {
  render() {
    return (
      <div className="movie-card">
        <Grid>
          <Row className="show-grid">
            <Col xs={12} md={8}>
              <img src={this.props.imgSrc}/>
            </Col>
            <Col xs={6} md={4}>
              <h1>{this.props.title}</h1>
              <h2>({this.props.year})</h2>
              <h3>{this.props.director}</h3>
            </Col>
          </Row>
        </Grid>

      </div>
    );
  }
}

export default MovieCard;
