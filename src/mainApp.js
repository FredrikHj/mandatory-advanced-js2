import React, { Component, useState } from 'react';
import './movieapi.css';
import Navbar from './helpComponents.js';

import AddPage from './addPage.js';
import EditPage from './editPage.js';
import DetailsPage from './detailsPage.js';
import MainPage from './mainPage.js';

let getMoviesList;

// ================================================ The App´s Function Components =================================================
class MainApp extends Component {
  constructor(props) {
    super(props);
    this.state = { movieList: [], searchMovie: ''};
    this.serverUrl = this.serverUrl;
    this.handleMovieData = this.handleMovieData.bind(this);
  }
  componentDidMount() {
    this.serverUrl = 'http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies';
    console.log('App start');
    this.requestMovies = new XMLHttpRequest();
    this.requestMovies.addEventListener('load', this.handleMovieData);
    this.requestMovies.open("GET", this.serverUrl);
    this.requestMovies.send();
  }
  componentWillUnmount() {
    this.requestMovies.removeEventListener('load', this.handleMovieData);
  }
  handleMovieData() {
    let getMoviesList = JSON.parse(this.requestMovies.responseText);
    console.log(getMoviesList);
    this.setState({movieList: getMoviesList})
  }
  render() {
    let test = this.state.movieList;
    console.log(test);
    return (
      <div id="appBody">
        <header>
          <p id="headLine"> Movie API</p>
        </header>
        <main>
          <MainPage movieListData={ this.state.movieList }/>
          <AddPage/>
          <EditPage/>
          <DetailsPage/>
        </main>
      </div>
    );
  }
}

export default MainApp;
