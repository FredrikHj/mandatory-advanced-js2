import React, { Component } from 'react';
import {Helmet} from "react-helmet";

// React Router - ES6 modules
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class DetailsPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log('Sidans namn ska vara Details, den är: ');
    console.log(this.props.currentPage);
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Movie API - Details</title>
        </Helmet>
        <div className="page" style={(this.props.currentPage != 'Details') ? {display: 'none'} : null}
        >
          <section className="addRow">
            <div>
              <label htmlFor="addTitle">Titel<br/>
              <p id="addTitle"></p>
              </label><br/>
            </div>
            <div>
              <label htmlFor="addDirector">Regissör<br/>
                <p id="addDirector"></p>
              </label><br/>
            </div>
          </section>
          <section className="addRow">
            <div>
              <label htmlFor="addDescription">Beskrivning<br/>
                <textarea id="addDescription"></textarea>
                <p id="addDescription"></p>
              </label>
            </div>
            <div>
              <label htmlFor="addRating">Betyg<br/>
                <p id="addRating"></p><br/>
              </label>
              {/*<input type="submit" id="formSubmitBtn" value="Lägg till film"/> */}
            </div>
          </section>
        </div>
    </>
    );
  }
}
export default DetailsPage;
