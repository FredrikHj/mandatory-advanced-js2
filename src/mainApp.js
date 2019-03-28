import React, { Component } from 'react';
//import axios from 'axios';
import './movieapi.css';
import {Helmet} from "react-helmet";

// React Router - ES6 modules
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

import MainPage from './mainPage.js';
import AddPage from './addPage.js';
let getMoviesList;

// ================================================ The App´s Function Components =================================================
class MainApp extends Component {
  constructor(props) {
    super(props);
    // Sett intialstate for the functions in the app. Group some of them together
    this.state = {
      mainStart: true,
      addRedirect: false,
      currentPage: 'Main'
    }
    //this.location = this.location
    this.headLine = this.headLine;
    this.pushMain = this.pushMain.bind(this);
    this.pushAdd = this.pushAdd.bind(this);
    this.pushDetails = this.pushDetails.bind(this);
    this.totMovies = this.totMovies;
    this.pushEdit = this.pushEdit.bind(this);
  }
    // Functions for navBtn
  pushMain() {
    this.setState({currentPage: 'Main'});
  }
  pushAdd() {
    this.setState({currentPage: 'Add'});
  }
  pushEdit() {
    this.setState({currentPage: 'Edit'});
  }
  pushDetails() {
    this.setState({currentPage: 'Details'});
  }
  render() {
    console.log(this.state.currentPage);
    // if (this.state.addRedirect === true) return <Redirect to="/"/>;
    console.log(this.state.routerSetting);
    // Send data for the page which need it  style={(this.state.currentPage === 'Add_editPage') ? {color: 'green', fontWeight: 'bold'} : null}
    return (
      <div id="appBody">
      <p className="pagesHeadLine">Movie API - {this.state.currentPage }</p>
        <Router>
          <Link to="/Main" style={{textDecoration: 'none'}} onClick={ this.pushMain }><p>Hem</p></Link>
          <Link to="/Add" style={{textDecoration: 'none'}} onClick={ this.pushAdd }><p>Lägga till</p></Link>

          <Route path="/Main" render={() => (
            (this.state.currentPage === '') ? (
              <Redirect to="/"/>
            ) : (
              null
            )
          )}/>
          <Route path="/" render={(props) => <MainPage {...props}
                pushEdit={ this.pushEdit }
                pushDetails={ this.pushDetails }
                currentPage={this.state.currentPage}
            />}
          />
          <Route path="/Add" render={(props) => <AddPage {...props}
                currentPage={this.state.currentPage}
            />}
          />
        </Router>
      </div>
    );
  }
}

export default MainApp;
