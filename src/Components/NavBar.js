import React, { Component } from 'react';
import './NavBar.css';
import {Navbar, FormGroup, FormControl, Button} from 'react-bootstrap';

class NavBar extends Component {
  render() {
    return (
      <div>
        <Navbar className="navigation navbar-fixed-top">
          <Navbar.Header>
            <Navbar.Brand>
              <p className ="navigation-brand">{this.props.pageTitle}</p>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Navbar.Form>
              <div className="form-group-button">
                <FormGroup>
                  <FormControl className="search-field" type="text" placeholder="Search Films, Book, TV Shows, or Places" />
                </FormGroup>{' '}
                <Button className="search-submit" type="submit">Search</Button>
              </div>
            </Navbar.Form>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
