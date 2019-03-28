import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import axios from 'axios';

// React Router - ES6 modules
import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";

import MainApp from './mainApp.js';
import DetailsPage from './detailsPage.js';
import EditPage from './editPage.js';

class MainPage extends Component {
  constructor(props) {
    super(props);
    // Sett intialstate for the functions in the app. Group some of them together
    this.state = {
      movieList: [],
      searchMovieText: '',
      mainPage: true
    }
    this.serverUrl = this.serverUrl;
    this.handleMovieData = this.handleMovieData.bind(this);
    this.sortMovieList = this.sortMovieList.bind(this);
    this.removeMovie = this.removeMovie.bind(this);
}
  componentDidMount() {
    // Incomming data is requested and load in the funtions bellow
    this.serverUrl = 'http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies';
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

  // Function is triggered every time I type a letter, it will sort on Title and Director. If field is emty the movieList is not change
  sortMovieList(e) {
    let getInsertedLetter = e.target.value;
    this.setState({searchMovieText: getInsertedLetter});
    console.log(getInsertedLetter);
  }
  removeMovie(e) {
    let targetRemoveBtnMovieIndex = e.target.value;
    let targetRemoveBtnMovieId = e.target.id;
    let arrMovies = this.state.movieList;
    console.log(arrMovies);

    // Remove the movie both from the server and the view will be rerender
    axios.delete(this.serverUrl + '/' + targetRemoveBtnMovieId);
      this.setState({ movieList: [
        ...this.state.movieList
      ]
    });

    let newMovieList = [...this.state.movieList.slice(0, targetRemoveBtnMovieIndex), ...this.state.movieList.slice(targetRemoveBtnMovieIndex + 1)];
    this.setState({ movieList: newMovieList});
  }
  // pushEdit() {
  //   // this.setState({mainPage: false});
  // }
  render() {
    console.log(this.props.currentPage);
    let countMovie = -1;
    let movieData = this.state.movieList;
    console.log(this.searchMovie);
    let filterList = movieData.filter((movieListData) =>
      {
        console.log(movieListData);
        return movieListData.title.includes(this.state.searchMovieText)
          || movieListData.director.includes(this.state.searchMovieText)
      }
    )
    console.log(filterList);
    let getRouterSetting = this.routerSetting;
    return (
      <>
      <Router>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Movie API - Main</title>
        </Helmet>
        <div className="page" style={(this.props.currentPage != 'Main') ? {display: 'none'} : null}
        >
          <section id="searchMovie">
            Sök efter en film:
            <input type="text" onChange={ this.sortMovieList }/>
          </section>
          <table>
            <thead>
              <tr><th>Title</th><th>Director</th><th>Rating</th></tr>
            </thead>
            <tbody>
             {
                filterList.map((obj) => {
                  console.log(obj);
                  countMovie += 1;
                  return (
                    <tr key={countMovie}>
                      <td>{ obj.title }</td><td>{ obj.director }</td><td>{ obj.rating }</td>
                      <td>
                        <button className="deleteBtn" id={ obj.id } onClick={ this.removeMovie } value={ countMovie }>Radera filmen</button>
                      </td>
                      <td value={ countMovie }>
                        <Link to={"/Edit/" + obj.id} className="editBtn" id={ obj.id } value={ countMovie } onClick={ this.props.pushEdit }>Edit</Link>
                      </td>
                      <td value={ countMovie }>
                        <Link to={"/Details/" + obj.id} className="detailsBtn" id={ obj.id } value={ countMovie } onClick={ this.props.pushDetails }>Details</Link>
                      </td>
                      <td>{ obj.id }</td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
        <Route path="/Edit/:id" render={(props) => <EditPage {...props}
              currentPage={this.props.currentPage}
          />}
        />
        <Route path="/Details" render={(props) => <DetailsPage {...props}
              currentPage={this.props.currentPage}
          />}
        />
        </Router>
      </>
    );
  }

}
export default MainPage;
