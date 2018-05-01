import React, { Component } from 'react';
import MovieCard from './MovieCard';
import './MovieCardList.css'
import {Dropdown, DropdownButton, MenuItem, Bootstrap, Grid, Row, Col} from 'react-bootstrap';
import NavBar from './NavBar';
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
      <div>
        <NavBar pageTitle="Paris in Films"/>

        <div className="drop-down-row">
          <Dropdown>
            <Dropdown.Toggle className="drop-down-menu">
              <span className="drop-down-text">Set in Paris</span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="drop-down-items">
              <MenuItem className="drop-down-single-item item-selected" eventKey="1">Set in Paris</MenuItem>
              <MenuItem className="drop-down-single-item" eventKey="2">Filmed in Paris</MenuItem>
            </Dropdown.Menu>
          </Dropdown>


          <Dropdown>
            <Dropdown.Toggle className="drop-down-menu">
              <span className="drop-down-text">All Genres</span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="drop-down-items">
              <MenuItem className="drop-down-single-item item-selected" eventKey="1">All Genres</MenuItem>
              <MenuItem className="drop-down-single-item" eventKey="2">Comedy</MenuItem>
              <MenuItem className="drop-down-single-item" eventKey="3">Sci-Fi</MenuItem>
              <MenuItem className="drop-down-single-item" eventKey="4">Horror</MenuItem>
              <MenuItem className="drop-down-single-item" eventKey="5">Romance</MenuItem>
              <MenuItem className="drop-down-single-item" eventKey="6">Drama</MenuItem>
              <MenuItem className="drop-down-single-item" eventKey="7">Action</MenuItem>
              <MenuItem className="drop-down-single-item" eventKey="8">Adventure</MenuItem>
            </Dropdown.Menu>
          </Dropdown>


          <Dropdown>
            <Dropdown.Toggle className="drop-down-menu">
              <span className="drop-down-text">All Districts</span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="drop-down-items">
              <MenuItem className="drop-down-single-item item-selected" eventKey="1">All Districts</MenuItem>
              <MenuItem className="drop-down-single-item" eventKey="2">Quartier Latin</MenuItem>
              <MenuItem className="drop-down-single-item" eventKey="3">Le Marais</MenuItem>
              <MenuItem className="drop-down-single-item" eventKey="4">Belleville</MenuItem>
              <MenuItem className="drop-down-single-item" eventKey="5">Montmartre</MenuItem>
              <MenuItem className="drop-down-single-item" eventKey="6">Bastille</MenuItem>
              <MenuItem className="drop-down-single-item" eventKey="7">Montparnasse</MenuItem>
              <MenuItem className="drop-down-single-item" eventKey="8">Madeleine</MenuItem>
              <MenuItem className="drop-down-single-item" eventKey="9">Pigalle</MenuItem>
            </Dropdown.Menu>
          </Dropdown>


          <Dropdown>
            <Dropdown.Toggle className="drop-down-menu">
              <span className="drop-down-text">Sort by Viewing History</span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="drop-down-items">
              <MenuItem className="drop-down-single-item item-selected" eventKey="1">Sort by Viewing History</MenuItem>
              <MenuItem className="drop-down-single-item" eventKey="2">Sort by Number of Locations</MenuItem>
              <MenuItem className="drop-down-single-item" eventKey="3">Sort by Popularity</MenuItem>
              <MenuItem className="drop-down-single-item" eventKey="4">Sort by Release Time</MenuItem>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div className="movie-card-list">
          <p className="results-found">8 films found</p>
              {this.state.movieCards.map((card,i)=>{
                let tempRoute=card.title.split(" ").join("");
                console.log(tempRoute);
                return <Link to={tempRoute}><MovieCard title={card.title}
                year={card.year}
                imgSrc={card.imgSrc}
                director={card.director}
                genres={card.genres}
                description={card.description}
                numLocations={card.numLocations}/></Link>
              })}
        </div>
      </div>

    );
  }
}

export default MovieCardList;
