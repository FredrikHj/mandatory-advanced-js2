import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import axios from 'axios';

// React Router - ES6 modules
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class DetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = { movieShow: {
      title: '',
      director: '',
      description: '',
      rating: 0.0
      }
    }
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
      this.setState({movieShow: response.data });
    })
    .catch(error => {
      console.log(error);
       if (error.response && error.response.status === 404) {
         this.setState({error: "Connection  faulty, contact webmaster!!!!"})
       }
    });
  }
  render() {
    let targetShowMovie = this.state.movieShow;
    console.log('Sidans namn ska vara Details, den är: ');
    console.log(this.props.currentPage);
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Movie API - {this.props.currentPage}</title>
        </Helmet>
        <div className="page" style={(this.props.currentPage != 'Details') ? {display: 'none'} : null}
        >

        <table id="movies">
          <thead>
            <tr><th>Titel</th><th>Regissör</th><th className="widthDesDet">Beskrivning</th><th>Betyg</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>{ targetShowMovie.title }</td><td>{ targetShowMovie.director }</td><td className="widthDesDet">{ targetShowMovie.description }</td><td>{ targetShowMovie.rating }</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
    );
  }
}
export default DetailsPage;
