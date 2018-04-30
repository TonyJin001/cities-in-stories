import React, { Component } from 'react';
import './App.css';
import MovieCardList from './Components/MovieCardList';
import NavBar from './Components/NavBar';
import {Navbar, FormGroup, FormControl, Button} from 'react-bootstrap';
import {BrowserRouter, Route, Link,Switch} from "react-router-dom";
import FilmDetails from './Components/FilmDetails';
import SceneDetails from './Components/SceneDetails';

class App extends Component {



  render() {
    const BeforeSunsetDetails = (props) => {
      return (
        <FilmDetails title="Paris in Before Sunset" route="BeforeSunset" dbIndex="0" />
      );
    }

    const BeforeSunsetSceneDetails = (props) => {
      return (
        <SceneDetails title="Quai Saint-Bernard in Before Sunset" dbIndex="quai-saint-bernard" lat="48.8468697" lng="2.360971000000063" film="Before Sunset" filmIndex="0"/>
      );
    }

    return (
      <div>

        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={MovieCardList}/>
            <Route path="/BeforeSunset" exact render={BeforeSunsetDetails}/>
            <Route path="/BeforeSunset/QuaiSaint-Bernard" exact render={BeforeSunsetSceneDetails} />
          </Switch>
        </BrowserRouter>
      </div>

    );
  }
}

export default App;
