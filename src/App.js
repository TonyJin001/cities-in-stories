import React, { Component } from 'react';
import './App.css';
import MovieCardList from './Components/MovieCardList';
import NavBar from './Components/NavBar';
import {Navbar, FormGroup, FormControl, Button} from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar pageTitle="Paris in Films"/>
        <MovieCardList />
      </div>
    );
  }
}

export default App;
