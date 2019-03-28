// Kvar att fixa Edit med PUT och redigeringen + React router = stanna kvar vi refresh
import React, { Component } from 'react';
//import axios from 'axios';
import './movieapi.css';
import {Helmet} from "react-helmet";
import axios from 'axios';

// React Router - ES6 modules
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

import AddPage from './addPage.js';
import EditPage from './editPage.js';
import DetailsPage from './detailsPage.js';
let getMoviesList;

// ================================================ The App´s Function Components =================================================
class MainPage extends Component {
  constructor(props) {
    super(props);
    // Sett intialstate for the functions in the app. Group some of them together
    this.state = {
      movieList: [],
      searchMovieText: '',
      currentPage: 'Main'
    }
    //this.location = this.location
    //this.headLine = this.headLine;
    this.serverUrl = this.serverUrl;
    this.handleMovieData = this.handleMovieData.bind(this);
    this.sortMovieList = this.sortMovieList.bind(this);
    this.removeMovie = this.removeMovie.bind(this);

    this.pushMain = this.pushMain.bind(this);
    this.pushAdd = this.pushAdd.bind(this);
    this.pushEdit = this.pushEdit.bind(this);
    this.pushDetails = this.pushDetails.bind(this);
    this.updateMovieList = this.updateMovieList.bind(this);
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
  pushMain() {
    console.log('esdf');
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
  // Function is triggered every time I type a letter, it will sort on Title and Director. If field is emty the movieList is not change
  sortMovieList(e) {
    let getInsertedLetter = e.target.value;
    this.setState({searchMovieText: getInsertedLetter});
  }
  updateMovieList(movieAdd) {
    console.log(movieAdd);
    this.setState({movieList: [
      ...this.state.movieList,
      movieAdd]
    });
  }
  removeMovie(e) {
    let targetRemoveBtnMovieIndex = e.target.value;
    let targetRemoveBtnMovieId = e.target.id;
    console.log(targetRemoveBtnMovieId);
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
    console.log(this.state.movieList);
    let countMovie = -1;
    let movieData = this.state.movieList;
    let filterList = movieData.filter((movieListData) =>
      {
        return movieListData.title.includes(this.state.searchMovieText)
          || movieListData.director.includes(this.state.searchMovieText)
      }
    )
    let getRouterSetting = this.routerSetting;

    // Send data for the page which need it  style={(this.state.currentPage === 'Add_editPage') ? {color: 'green', fontWeight: 'bold'} : null}
    return (
      <div id="appBody">
        <p id="pagesHeadLine">Movie API - {this.state.currentPage }</p>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Movie API - Main</title>
        </Helmet>
        <Router>
          <Link to="/Main" style={{textDecoration: 'none'}} onClick={ this.pushMain }><p>Hem</p></Link>
          <Link to="/Add" style={{textDecoration: 'none'}} onClick={ this.pushAdd }><p>Lägga till</p></Link>

          <div className="page" style={(this.state.currentPage != 'Main') ? {display: 'none'} : null}>
            <section id="searchMovie">
              Sök efter en film:<br/>
              <input type="text" onChange={ this.sortMovieList }/>
            </section>
            <table>
              <thead>
                <tr><th>Title</th><th>Director</th><th>Rating</th></tr>
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
                          <Link to={"/Edit/" + obj.id} className="editBtn" id={ obj.id } value={ countMovie } onClick={ this.pushEdit }>Edit</Link>
                        </td>
                        <td value={ countMovie }>
                          <Link to={"/Details/" + obj.id} className="detailsBtn" id={ obj.id } value={ countMovie } onClick={ this.pushDetails }>Details</Link>
                        </td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>
          <Route path="/Add" render={(props) => <AddPage {...props}
              currentPage={this.state.currentPage}
              pushMain={ this.pushMain }
              updateMovieList={this.updateMovieList}
            />}
          />
          <Route path="/Edit/:id" render={(props) => <EditPage {...props}
                currentPage={this.state.currentPage}
            />}
          />
          <Route path="/Details/:id" render={(props) => <DetailsPage {...props}
                currentPage={this.state.currentPage}
            />}
          />
        </Router>
      </div>
    );
  }
}

export default MainPage;
