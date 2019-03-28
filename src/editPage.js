import React, { Component } from 'react';
import axios from 'axios';
import './movieapi.css';
import {Helmet} from "react-helmet";

// React Router - ES6 modules
import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";

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
    console.log('fesaf');
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
  componentWillUnmount() {
    // this.setState({
    //   movieEdit: {
    //     ...this.state.movieEdit,
    //     title: '',
    //     director: '',
    //     description: '',
    //     rating: 0.0
    //   }
    // })
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
    // let addedMovie = {
    //   "title": this.state.addTitle,
    //   "description": this.state.addDescription,
    //   "director": this.state.addDirector,
    //   "rating": this.state.addRating
    // }
    axios.put(this.serverUrl + '/' +  this.movieIdUpdating).then((response) => {
      this.setState({
        redirect: true
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
      console.log(errorDataType);
      // let errorStr = error.response.data[0].message;
      //
      // // String clean up -> turn str into array, one word is one index --> remove index 0 ---> loop through the array into a string sentence againg
      // let errorStrCleanUp = errorStr.split(' ');
      // errorStrCleanUp.shift();
      //
      // let arrForDisplayWords = [];
      // let newErrorMess = '';
      // for (let errorStrCleanUpEachWord of errorStrCleanUp) {
      //   arrForDisplayWords.push(errorStrCleanUpEachWord);
      //   newErrorMess = arrForDisplayWords.join(' ');
      // }
      // let errorMessDisplay = newErrorMess.charAt(0).toUpperCase() + newErrorMess.slice(1);
      //
      //
      // let validateCorrField = errorDataType.data[0].context.key;
      // console.log(validateCorrField);
      //
      // // Handle removing the validate error mess
      // if (errorDataType.status === 400) {
      //   this.setState({ errorMessages: {...this.state.errorMessages, [validateCorrField]: {value: true, mess: errorMessDisplay}}});
      //   if (validateCorrField != 'title') this.setState({ errorMessages: {...this.state.errorMessages, title: {value: false, mess: ''}}});
      //   if (validateCorrField != 'director') this.setState({ errorMessages: {...this.state.errorMessages, director: {value: false, mess: ''}}});
      //   if (validateCorrField != 'description') this.setState({ errorMessages: {...this.state.errorMessages, description: {value: false, mess: ''}}});
      //   if (validateCorrField != 'rating') this.setState({ errorMessages: {...this.state.errorMessages, rating: {value: false, mess: ''}}});
      // }
    });

    e.preventDefault();
  }
  render() {
    console.log('Du tryckte på: ');
    console.log(this.state.movieEdit);
    let data = this.state.movieEdit;

    // Set first letter = Bigg
    let BigTitle = data.title.charAt(0).toUpperCase() + data.title.slice(1);
    let BigDirector = data.director.charAt(0).toUpperCase() + data.director.slice(1);
    let BigDescription = data.description.charAt(0).toUpperCase() + data.description.slice(1);


    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Movie API - Edit</title>
        </Helmet>
        <div className="page" style={(this.props.currentPage != 'Edit') ? {display: 'none'} : null}
        >
          <form onSubmit={ this.submitEditMovie }>
            <section className="addRow">
              <div>
                <label htmlFor="addTitle">Titel <span className="errorMessContainer" style={(this.state.errorMessages.title.value ===  true)
                  ? {display: 'block'} : {display: 'none'} }><p className="errorMessText">{ this.state.errorMessages.title.mess }</p></span> <br/>
                <input type="text" id="addTitle" value={BigTitle} onChange={this.changeTitle}/>
                </label><br/>
              </div>
              <div>
                <label htmlFor="addDirector">Regissör <span className="errorMessContainer"><p className="errorMessText"></p></span><br/>
                  <input type="text" id="addDirector" value={BigDirector} onChange={this.changeDirector}/>
                </label><br/>
              </div>
            </section>
            <section className="addRow">
              <div>
                <label htmlFor="addDescription">Beskrivning <span className="errorMessContainer"><p className="errorMessText"></p></span><br/>
                  <textarea id="addDescription" value={BigDescription} onChange={this.changeDescription}></textarea>
                </label>
              </div>
              <div>
                <label htmlFor="addRating">Betyg <span className="errorMessContainer"minLength="1.0"><p className="errorMessText"></p></span><br/>
                  <input type="text" id="addRating" value={data.rating} onChange={this.changeRating}/><br/>
                </label>
              </div>
            </section>
            <input type="submit" id="formSubmitEditBtn" value="Edit Movie"/>
          </form>
        </div>
      </>
    );
  }
}
export default EditPage;
