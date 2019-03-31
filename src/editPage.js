import React, { Component } from 'react';
import axios from 'axios';
import './movieapi.css';
import {Helmet} from "react-helmet";

// React Router - ES6 modules
import { BrowserRouter as Router, Route, Link , Redirect} from "react-router-dom";

class EditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieEdit: {
        title: '',
        director: '',
        description: '',
        rating: 0.0
      },
      errorMessages: {
        title: {value: false, mess: ''},
        director:  {value: false, mess: ''},
        description: {value: false, mess: ''},
        rating:  {value: false, mess: ''},
      },
      redirect: false
    }
    this.serverUrl = this.serverUrl;
    this.movieIdUpdating = this.movieIdUpdating;

    this.changeTitle = this.changeTitle.bind(this);
    this.changeDirector = this.changeDirector.bind(this);
    this.changeDescription = this.changeDescription.bind(this);
    this.changeRating = this.changeRating.bind(this);
    this.submitEditMovie = this.submitEditMovie.bind(this);
  }
  componentDidMount() {
    // Incomming data is requested and load in the funtions bellow based on the edit link I choosen
    this.serverUrl = 'http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/';
    this.movieIdUpdating = this.props.match.params.id;
    console.log('Inommande film: ');
    console.log(this.movieIdUpdating);

    axios.get(this.serverUrl + this.movieIdUpdating)
    .then(response => {
      console.log('Incomming respose:');
      console.log(response);
      this.setState({movieEdit: response.data });
    })
    .catch(error => {
      console.log(error);
       if (error.response && error.response.status === 404) {
         this.setState({error: "Connection  faulty, contact webmaster!!!!"})
       }
    });
  }
  changeTitle(e) {
    this.setState({movieEdit: {
      ...this.state.movieEdit,
      title: e.target.value
      }
    });
  }
  changeDirector(e) {
    this.setState({movieEdit: {
      ...this.state.movieEdit,
      director: e.target.value
      }
    });
  }
  changeDescription(e) {
    this.setState({movieEdit: {
      ...this.state.movieEdit,
      description: e.target.value
      }
    });
  }
  changeRating(e) {
    this.setState({movieEdit: {
      ...this.state.movieEdit,
      rating: e.target.value
      }
    });
  }
  submitEditMovie(e) {
    // Data wich contains my edit movie
    let editMovie = {
      "title": this.state.movieEdit.title,
      "description": this.state.movieEdit.description,
      "director": this.state.movieEdit.director,
      "rating": this.state.movieEdit.rating
    }
    let putUrl = this.serverUrl + this.movieIdUpdating;
    axios.put(putUrl, editMovie)
    .then((response) => {
      let myAddMovie = response.data;
      //If some error mess is showing it will remove all the error mess if the fields is according the condition
      if (response.status === 200) {
        this.setState({
          errorMessages: {
            ...this.state.errorMessages,
            title: {value: false, mess: ''},
            director:  {value: false, mess: ''},
            description: {value: false, mess: ''},
            rating:  {value: false, mess: ''}
          },
          redirect: true,
        });
      }
    })
    // If not the condition is meet it will show a error mess. One mess at a time, the first mess is showing fist
    .catch((error) =>{
      let errorDataType = error.response;
      console.log(errorDataType);
      let errorStr = errorDataType.data.details[0].message;
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


      let validateCorrField = errorDataType.data.details[0].context.key;
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
  render() {
    if (this.state.redirect === true) {
    console.log('Inne');
      return <Redirect to="/"/>;
    }
    let data = this.state.movieEdit;

    // Set first letter = Bigg
    let BigTitle = data.title.charAt(0).toUpperCase() + data.title.slice(1);
    let BigDirector = data.director.charAt(0).toUpperCase() + data.director.slice(1);
    let BigDescription = data.description.charAt(0).toUpperCase() + data.description.slice(1);

    return (
      <>
        <p id="pagesHeadLine">Movie API - Editera</p>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Movie API - Editera</title>
        </Helmet>
        <div className="page">
          <form onSubmit={ this.submitEditMovie }>
            <section className="row1">
              <div>
                <label htmlFor="title">Titel <br/>
                <input type="text" id="title" value={BigTitle} onChange={this.changeTitle}/><span className="errorMessContainer" style={(this.state.errorMessages.title.value ===  true)
                  ? {display: 'block'} : {display: 'none'} }><p className="errorMessText">{ this.state.errorMessages.title.mess }</p></span>
                </label><br/>
              </div>
              <div id="directorContainer">
                <label htmlFor="director">Regissör <br/>
                  <input type="text" id="director" value={BigDirector} onChange={this.changeDirector}/> <span className="errorMessContainer" style={(this.state.errorMessages.director.value ===  true)
                    ? {display: 'block'} : {display: 'none'} }><p className="errorMessText">{ this.state.errorMessages.director.mess }</p></span>
                </label><br/>
              </div>
            </section>
            <section className="row2">
              <div id="descriptionContainer">
                <label htmlFor="description">Beskrivning <br/>
                  <textarea id="description" value={BigDescription} onChange={this.changeDescription}></textarea> <br/><span className="errorMessContainer" style={(this.state.errorMessages.description.value ===  true)
                    ? {display: 'block'} : {display: 'none'} }><p className="errorMessText">{ this.state.errorMessages.description.mess }</p></span>
                </label>
              </div>
              <div id="ratingContainer">
                <label htmlFor="rating">Betyg <br/>
                  <input type="text" id="rating" value={data.rating} onChange={this.changeRating}/><br/> <span className="errorMessContainer" style={(this.state.errorMessages.rating.value ===  true)
                    ? {display: 'block'} : {display: 'none'} }><p className="errorMessText">{ this.state.errorMessages.rating.mess }</p></span>
                </label>
              </div>
            </section>
            <input type="submit" id="formSubmitBtn" value="Edit Movie"/>
          </form>
        </div>
      </>
    );
  }
}
export default EditPage;
