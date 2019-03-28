import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import axios from 'axios';
import MainPage from './mainPage.js';

// React Router - ES6 modules
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

class AddPage extends Component {
  constructor(props) {
    super(props);
    // Sett intialstate for the functions in the app. Group some of them together
    this.state = {
      errorMessages: {
        title: {value: false, mess: ''},
        director:  {value: false, mess: ''},
        description: {value: false, mess: ''},
        rating:  {value: false, mess: ''},
     },
   }
    this.addMovie = this.addMovie.bind(this);
    this.submitAddMovie = this.submitAddMovie.bind(this);
  }
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
    axios.post('http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/', addedMovie).then((response) => {
      let myAddMovie = response.data;
      //console.log(myAddMovie);

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
      this.props.updateMovieList(myAddMovie);
      this.props.pushMain();
    })
    // If not the con dition is meet it will show a error mess. One mess at a time, the first mess is showing fist
    .catch((error) => {
      console.log(error);
      let errorDataType = error.response;
      let errorStr = error.response.data[0].message;
      console.log(errorStr);

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
    })
    e.preventDefault();
  }
  render() {
    let errorStatus = this.state.errorMessages;
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Movie API - Add</title>
        </Helmet>
        <div className="page" style={(this.props.currentPage != 'Add') ? {display: 'none'} : null}>
          <form onSubmit={ this.submitAddMovie }>
            <section className="addRow">
              <div>
                <label htmlFor="addTitle">Titel  <br/>
                  <input type="text" id="addTitle" onChange={ this.addMovie }/>
                  <span className="errorMessContainer" style={(errorStatus.title.value ===  true) ? {display: 'block'} : {display: 'none'} }>
                    <p className="errorMessText">{ errorStatus.title.mess }</p>
                  </span>
                </label><br/>
              </div>
              <div>
                <label htmlFor="addDirector">Regissör <br/>
                  <input type="text" id="addDirector" onChange={ this.addMovie }/>
                  <span className="errorMessContainer" style={(errorStatus.director.value ===  true)
                    ? {display: 'block'} : {display: 'none'} }><p className="errorMessText">{ errorStatus.director.mess }</p>
                  </span>
                </label><br/>
              </div>
            </section>
            <section className="addRow">
              <div>
                <label htmlFor="addDescription">Beskrivning <br/>
                  <textarea id="addDescription" onChange={ this.addMovie }></textarea>
                  <span className="errorMessContainer" style={(errorStatus.description.value ===  true)
                    ? {display: 'block'} : {display: 'none'} }><p className="errorMessText">{ errorStatus.description.mess }</p>
                  </span>
                </label>
              </div>
              <div>
                <label htmlFor="addRating">Betyg <br/>
                  <input type="text" id="addRating" onChange={ this.addMovie }/><br/>
                  <span className="errorMessContainer"minLength="1.0" style={(errorStatus.rating.value ===  true)
                    ? {display: 'block'} : {display: 'none'} }><p className="errorMessText">{ errorStatus.rating.mess }</p></span>
                </label>
              </div>
            </section>
            <input type="submit" id="formSubmitAddBtn" value="Add Movie"/>
          </form>
        </div>
      </>
    );
  }
}
export default AddPage;
