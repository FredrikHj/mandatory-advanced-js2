import React, { Component, useState } from 'react';
import axios from 'axios';
import './movieapi.css';
import Navbar from './helpComponents.js';

import Add_editPage from './add_editPage.js';
import DetailsPage from './detailsPage.js';
import MainPage from './mainPage.js';

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
      searchMovie: '',
      currentEditMovie: 0,
      errorMessages: {
        title: {value: false, mess: ''},
        director:  {value: false, mess: ''},
        description: {value: false, mess: ''},
        rating:  {value: false, mess: ''},
      }
    };
    this.serverUrl = this.serverUrl;
    this.handleMovieData = this.handleMovieData.bind(this);
    this.totMovies = this.totMovies;
    this.addMovie = this.addMovie.bind(this);
    this.submitAddMovie = this.submitAddMovie.bind(this);
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
        console.log('fdz');
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
      console.log(errorDataType);

      let errorStr = error.response.data[0].message;
      console.log(errorStr);

      let validateCorrField = errorDataType.data[0].context.key;
    //  let test = errorStr.charAt(1).toUpperCase() + errorStr.slice(2);
      if (errorDataType.status === 400) {
        this.setState({ errorMessages: {
          ...this.state.errorMessages,
            [validateCorrField]: {
              value: true,
              mess: errorStr
            }
          }
        });
        if (validateCorrField != 'title' && validateCorrField === 'director' || validateCorrField === 'description' || validateCorrField === 'rating') {
          this.setState({ errorMessages: {
            ...this.state.errorMessages,
              title: {
                value: false,
                mess: ''
              }
            }
          });
        }
        if (validateCorrField != 'director' && validateCorrField === ' title' || validateCorrField === 'description' || validateCorrField === 'rating') {
          this.setState({ errorMessages: {
            ...this.state.errorMessages,
              director: {
                value: false,
                mess: ''
              }
            }
          });
        }
        if (validateCorrField != 'description' && validateCorrField === ' title' || validateCorrField === ' director' || validateCorrField === 'rating') {
          this.setState({ errorMessages: {
            ...this.state.errorMessages,
              description: {
                value: false,
                mess: ''
              }
            }
          });
        }
        if (validateCorrField != 'rating' && validateCorrField === ' title' || validateCorrField === ' director' || validateCorrField === 'description') {
          this.setState({ errorMessages: {
            ...this.state.errorMessages,
              rating: {
                value: false,
                mess: ''
              }
            }
          });
        }
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
    console.log(this.state.errorMessages);
    return (
      <div id="appBody">
        <header>
          <p id="headLine"> Movie API</p>
        </header>
        <main>
        // Send data for the page which need it
          <MainPage
            movieListData={ this.state.movieList }
            removeMovie={ this.removeMovie }
            />
          <Add_editPage
            addMovie={ this.addMovie }
            errorMesses={ this.state.errorMessages }
            submitAddMovie={ this.submitAddMovie }
          />
          <DetailsPage/>
        </main>
      </div>
    );
  }
}

export default MainApp;
