import React, { Component } from 'react';
import './App.css';
import MovieCardList from './Components/MovieCardList';
import NavBar from './Components/NavBar';
import {Navbar, FormGroup, FormControl, Button} from 'react-bootstrap';
import {BrowserRouter, Route, Link,Switch} from "react-router-dom";
import FilmDetails from './Components/FilmDetails';

class App extends Component {



  render() {
    const BeforeSunsetDetails = (props) => {
      return (
        <FilmDetails title="Paris in Before Sunset" dbIndex="0" />
      );
    }

    return (
      <div>
        <NavBar pageTitle="Cities in Stories"/>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={MovieCardList}/>
            <Route path="/BeforeSunset" exact render={BeforeSunsetDetails}/>
          </Switch>
        </BrowserRouter>
      </div>

    );
  }
}

export default App;
