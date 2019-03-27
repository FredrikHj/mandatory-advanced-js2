import React, { Component } from 'react';
import axios from 'axios';
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
      movieList: [],
      addTitle: '',
      addDirector: '',
      addDescription: '',
      addRating: 0.0,
      searchMovieText: '',

      errorMessages: {
        title: {value: false, mess: ''},
        director:  {value: false, mess: ''},
        description: {value: false, mess: ''},
        rating:  {value: false, mess: ''},
      },
      routerSetting: {
        appName: 'Movie API',
        currentPage: 'Main',
        editMode: false
      },
      mainStart: true
    };
    this.serverUrl = this.serverUrl;
    this.handleMovieData = this.handleMovieData.bind(this);
    this.pushMain = this.pushMain.bind(this);
    this.pushAdd = this.pushAdd.bind(this);

    this.sortMovieList = this.sortMovieList.bind(this);
    this.totMovies = this.totMovies;
    this.addMovie = this.addMovie.bind(this);
    this.submitAddMovie = this.submitAddMovie.bind(this);

    //this.callBackEditData = this.callBackEditData(this);
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
  // Functions for navBtn
  pushMain() {
  this.setState({routerSetting: {
      ...this.state.routerSetting,
      currentPage: 'Main'
    }})
  }
  pushAdd() {
    this.setState({routerSetting: {
      ...this.state.routerSetting,
      currentPage: 'Add'
    }})
  }

  // Function is triggered every time I type a letter, it will sort on Title and Director. If field is emty the movieList is not change
  sortMovieList(e) {
    let getInsertedLetter = e.target.value;
    this.setState({searchMovieText: getInsertedLetter});
    console.log(getInsertedLetter);
  }
  // Function is triggered every time I type a letter in one of my fields and store it into the stated objects above.
  addMovie(e) {
    let targetInput = e.target;
    let targetInputId = targetInput.id;
    let targetInputValue = targetInput.value;

    if (targetInputId === 'addTitle') this.setState({addTitle: targetInputValue});
    if (targetInputId === 'addDirector') this.setState({addDirector: targetInputValue});
    if (targetInputId === 'addDescription') this.setState({addDescription: targetInputValue});
    if (targetInputId === 'addRating') this.setState({addRating: targetInputValue});
  }
  // Function is triggered every time I push the Add movie and sent it into the server. =========================
  submitAddMovie(e) {
    let addedMovie = {
      "title": this.state.addTitle,
      "description": this.state.addDescription,
      "director": this.state.addDirector,
      "rating": this.state.addRating
    }
    axios.post(this.serverUrl + '/', addedMovie).then((response) => {
      let myResponseId = response.data;
      this.setState({ movieList: [
          ...this.state.movieList,
          myResponseId
        ]
      })
      // If some error mess is showing it will remove all the error mess if the fields is according the condition
      if (response.status === 201) {
        this.setState({errorMessages: {
          ...this.state.errorMessages,
          title: {value: false, mess: ''},
          director:  {value: false, mess: ''},
          description: {value: false, mess: ''},
          rating:  {value: false, mess: ''},
        }});
      }
    })
    // If not the condition is meet it will show a error mess. One mess at a time, the first mess is showing fist
    .catch((error) =>{
      let errorDataType = error.response;
      let errorStr = error.response.data[0].message;

      // String clean up -> turn str into array, one word is one index --> remove index 0 ---> loop through the array into a string sentence againg
      let errorStrCleanUp = errorStr.split(' ');
      errorStrCleanUp.shift();

      let arrForDisplayWords = [];
      let newErrorMess = '';
      for (let errorStrCleanUpEachWord of errorStrCleanUp) {
        arrForDisplayWords.push(errorStrCleanUpEachWord);
        newErrorMess = arrForDisplayWords.join(' ');
      }
      let errorMessDisplay = newErrorMess.charAt(0).toUpperCase() + newErrorMess.slice(1);


      let validateCorrField = errorDataType.data[0].context.key;
      console.log(validateCorrField);

      // Handle removing the validate error mess
      if (errorDataType.status === 400) {
        this.setState({ errorMessages: {...this.state.errorMessages, [validateCorrField]: {value: true, mess: errorMessDisplay}}});
        if (validateCorrField != 'title') this.setState({ errorMessages: {...this.state.errorMessages, title: {value: false, mess: ''}}});
        if (validateCorrField != 'director') this.setState({ errorMessages: {...this.state.errorMessages, director: {value: false, mess: ''}}});
        if (validateCorrField != 'description') this.setState({ errorMessages: {...this.state.errorMessages, description: {value: false, mess: ''}}});
        if (validateCorrField != 'rating') this.setState({ errorMessages: {...this.state.errorMessages, rating: {value: false, mess: ''}}});
      }
    });
    e.preventDefault();
  }

  // ============================================================================================================
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

  render() {

    if (this.state.mainStart === 'true') return <Redirect to="/"/>;
    console.log(this.state.searchMovieText);
    // Send data for the page which need it  style={(this.state.currentPage === 'Add_editPage') ? {color: 'green', fontWeight: 'bold'} : null}
    return (
      <div id="appBody">
        <Router>
          <p id="headLine">{ this.state.routerSetting.appName + ' - ' + this.state.routerSetting.currentPage }</p>
            <Link to="/" style={{textDecoration: 'none'}} onClick={ this.pushMain }><p>Hem</p></Link>
            <Link to="/Add" style={{textDecoration: 'none'}} onClick={ this.pushAdd }><p>Lägga till</p></Link>

          <Route exact path="/" render={(props) => <MainPage {...props}
            movieListData={ this.state.movieList }
            routerSetting={ this.state.routerSetting }
            sortMovieList={ this.sortMovieList }
            searchMovie={ this.state.searchMovieText }
            removeMovie={ this.removeMovie }
            pushEdit={ this.pushEdit }
            />}
          />
          <Route path="/Add" render={(props) => <AddPage {...props}
            addMovie={ this.addMovie }
            submitAddMovie={ this.submitAddMovie }
            errorMesses={ this.state.errorMessages }
            routerSetting={ this.state.routerSetting }
            />}
          />
        </Router>
      </div>
    );
  }
}

export default MainApp;
