// Kvar att fixa Edit med PUT och redigeringen + React router = stanna kvar vi refresh
import React, { Component } from 'react';
import './movieapi.css';
import {Helmet} from "react-helmet";
import axios from 'axios';

// React Router - ES6 modules
import { BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";
let getMoviesList;

// ================================================ The App´s Function Components =================================================
class MainPage extends Component {
  constructor(props) {
    super(props);
    // Sett intialstate for the functions in the app. Group some of them together
    this.state = {
      movieList: [],
      searchMovieText: '',
    }

    this.serverUrl = this.serverUrl;
    this.handleMovieData = this.handleMovieData.bind(this);
    this.sortMovieList = this.sortMovieList.bind(this);
    this.removeMovie = this.removeMovie.bind(this);
    this.totMovies = this.totMovies;
  }
  componentDidMount() {
    // Incomming data is requested and load in the funtions bellow
    this.serverUrl = 'http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/';
    this.requestMovies = new XMLHttpRequest();
    this.requestMovies.addEventListener('load', this.handleMovieData);
    this.requestMovies.open("GET", this.serverUrl);
    this.requestMovies.send();
  }
  componentWillUnmount() {
    this.requestMovies.removeEventListener('load', this.handleMovieData);
  }
  handleMovieData() {
    // The Ajax data is insurtet into the array above
    let getMoviesList = JSON.parse(this.requestMovies.responseText);
    this.setState({movieList: getMoviesList});
  }
    // Functions for navBtn
  // Function is triggered every time I type a letter, it will sort on Title and Director. If field is emty the movieList is not change
  sortMovieList(e) {
    let getInsertedLetter = e.target.value;
    this.setState({searchMovieText: getInsertedLetter});
  }
  // A callback which will update the movieList with its incomming data
    // Removing the last index wich not contain any id from the server
  removeMovie(e) {
    let targetRemoveBtnMovieIndex = e.target.value;
    let targetRemoveBtnMovieId = e.target.id;
    let arrMovies = this.state.movieList;

    // Remove the movie both from the server and the view will be rerender
    axios.delete(this.serverUrl + targetRemoveBtnMovieId);
      this.setState({ movieList: [
        ...this.state.movieList
      ]
    });
    let newMovieList = [...this.state.movieList.slice(0, targetRemoveBtnMovieIndex), ...this.state.movieList.slice(targetRemoveBtnMovieIndex + 1)];
    this.setState({ movieList: newMovieList});
  }
  render() {
    let countMovie = -1;
    let movieData = this.state.movieList;
    let filterList = movieData.filter((movieListData) =>
      {
        return movieListData.title.includes(this.state.searchMovieText)
          || movieListData.director.includes(this.state.searchMovieText)
      }
    )
    let getRouterSetting = this.routerSetting;

    return (
      <>
        <p id="pagesHeadLine">Movie API - Huvudsida</p>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Movie API - Huvudsida</title>
        </Helmet>
        <Router>
          <div className="page">
            <section id="searchMovie">
              Sök efter en film:<br/>
              <input type="text" onChange={ this.sortMovieList }/>
            </section>
            <table id="movies">
              <thead>
                <tr><th>Titel</th><th>Regissör</th><th>Betyg</th><th colSpan="3">Verktyg</th></tr>
              </thead>
              <tbody>
               {
                  filterList.map((obj) => {
                    countMovie += 1;
                    return (
                      <tr key={countMovie}>
                        <td>{ obj.title }</td><td>{ obj.director }</td><td>{ obj.rating }</td>
                        <td>
                          <button className="deleteBtn" id={ obj.id } onClick={ this.removeMovie } value={ countMovie }>Radera filmen</button>
                        </td>
                        <td value={ countMovie }>
                          <Link to={"/Edit/" + obj.id} id={ obj.id } value={ countMovie }>Edit</Link>
                        </td>
                        <td value={ countMovie }>
                          <Link to={"/Details/" + obj.id} id={ obj.id } value={ countMovie } onClick={ this.detailsPage }>Details</Link>
                        </td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>
        </Router>
      </>
    );
  }
}
export default MainPage;
