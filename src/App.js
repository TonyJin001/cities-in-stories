import React, { Component } from 'react';
import './App.css';
import MovieCardList from './Components/MovieCardList';
import NavBar from './Components/NavBar';
import {Navbar, FormGroup, FormControl, Button} from 'react-bootstrap';
import {BrowserRouter, Route, Link,Switch} from "react-router-dom";
import BeforeSunsetApp from './Components/BeforeSunsetApp';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar pageTitle="Paris in Films"/>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={MovieCardList}/>
            <Route path="/BeforeSunsetApp" exact component={BeforeSunsetApp}/>
          </Switch>
        </BrowserRouter>
      </div>

    );
  }
}

export default App;
