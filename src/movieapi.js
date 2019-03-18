import React, { Component, useState } from 'react';
import './movieapi.css';
let getMoviesList

// ===================================================== Request Movie API Data ====================================================
// ======================================= The App´s Funktion Copmponents - Help Components =======================================
function MovieTBody(props) {

  let incomminMovieData = props.movieListData;
  return (
      incomminMovieData.map((obj, countMovie) => {
        countMovie += 1;
        console.log(obj);
        return (
            <tr key={countMovie}><td>{ obj.title }</td><td>{ obj.director }</td><td>{ obj.rating }</td></tr>
        );
      })
  );
}
// ================================================ The App´s Funktion Copmponents =================================================
class MainApp extends Component {
  constructor(props) {
    super(props);
    this.state = { movieList: []};
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
      <p> Movie API</p>
      </header>
      <main>
      <div className="page">
        <p className="pageTitle">Main</p>
        <table>
          <thead>
            <tr><th>Title</th><th>Director</th><th>Rating</th></tr>
          </thead>
          <tbody>
            <MovieTBody movieListData={ this.state.movieList }/>
          </tbody>
        </table>
      </div>
      <AddPage/>
      <EditPage/>
      <DetailsPage/>
      </main>
      </div>
    );
  }
}
function AddPage() {
  return (
    <div className="page">
    <p className="pageTitle">Add</p>
    </div>
  );
}
function EditPage() {
  return (
    <div className="page">
    <p className="pageTitle">EditPage</p>
    </div>
  );
}
function DetailsPage() {
  return (
    <div className="page">
      <p className="pageTitle">Details</p>
    </div>
  );
}
export default MainApp;
