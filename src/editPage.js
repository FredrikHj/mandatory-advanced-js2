import React, { Component } from 'react';
import axios from 'axios';
import './movieapi.css';
import {Helmet} from "react-helmet";

// React Router - ES6 modules
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class EditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieEdit: null,

      errorMessages: {
        title: {value: false, mess: ''},
        director:  {value: false, mess: ''},
        description: {value: false, mess: ''},
        rating:  {value: false, mess: ''},
      },
    }
    this.props = this.props;
    this.serverUrl = this.serverUrl;
    //this.movieIdUpdating = this.movieIdUpdating;

    this.changeTitle = this.changeTitle.bind(this);
    this.submitEditMovie = this.submitEditMovie.bind(this);
  }
  componentDidMount() {
    console.log('fe<sd');
    // Incomming data is requested and load in the funtions bellow based on the edit link I choosen
    let movieIdUpdating = this.props.match.params.id;
    console.log(this.movieIdUpdating);

    axios.get("http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/" + movieIdUpdating)
    .then(response => {
      console.log('Incomming respose:');
      console.log(response.data);
         this.setState({movieEdit: response.data });
       })
       .catch(error => {
        console.log(error);
         if (error.response && error.response.status === 404) {
           this.setState({error: "Wrong Connection!!"})
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
  submitEditMovie(e) {
    // let addedMovie = {
    //   "title": this.state.addTitle,
    //   "description": this.state.addDescription,
    //   "director": this.state.addDirector,
    //   "rating": this.state.addRating
    // }
    axios.put(this.serverUrl + '/' +  this.movieIdUpdating).then((response) => {
      let myResponseId = response.data;
      console.log(myResponseId);
      this.setState({ movieList: [
          ...this.state.movieList,
          myResponseId
        ]
      })
      // If some error mess is showing it will remove all the error mess if the fields is according the condition
      // if (response.status === 201) {
      //   this.setState({errorMessages: {
      //     ...this.state.errorMessages,
      //     title: {value: false, mess: ''},
      //     director:  {value: false, mess: ''},
      //     description: {value: false, mess: ''},
      //     rating:  {value: false, mess: ''},
      //   }});
      // }
    })
    // If not the condition is meet it will show a error mess. One mess at a time, the first mess is showing fist
    .catch((error) =>{
      let errorDataType = error.response;
      console.log(errorDataType);
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
  render() {
    let data = this.state.movieEdit;
    console.log('Status:');
    console.log(data);

    let a = 'a';
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{ this.props.routerSetting.appName + ' - ' + this.props.routerSetting.currentPage }</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        <div className="page" //style={(this.props.pasthroughTitleData.routerSetting.currentPage != 'Add') ? {display: 'none'} : null}
        >
          <form onSubmit={ this.submitEditMovie }>
            <section className="addRow">
              <div>
                <label htmlFor="addTitle">Titel <span className="errorMessContainer" style={(this.state.errorMessages.title.value ===  true)
                  ? {display: 'block'} : {display: 'none'} }><p className="errorMessText">{ this.state.errorMessages.title.mess }</p></span> <br/>
                  <input maxLenght="40" type="text" id="addTitle" value={a} onChange={this.changeTitle} />
                </label><br/>
              </div>
              <div>
                <label htmlFor="addDirector">Regissör <span className="errorMessContainer"><p className="errorMessText"></p></span><br/>
                  <input type="text" id="addDirector"/>
                </label><br/>
              </div>
            </section>
            <section className="addRow">
              <div>
                <label htmlFor="addDescription">Beskrivning <span className="errorMessContainer"><p className="errorMessText"></p></span><br/>
                  <textarea id="addDescription"></textarea>
                </label>
              </div>
              <div>
                <label htmlFor="addRating">Betyg <span className="errorMessContainer"minLength="1.0"><p className="errorMessText"></p></span><br/>
                  <input type="text" id="addRating"/><br/>
                </label>
                <input type="submit" id="formSubmitBtn" value="Lägg till film"/>
              </div>
            </section>
          </form>
        </div>
      </>
    );
  }
}
export default EditPage;
