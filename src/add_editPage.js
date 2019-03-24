import React, { useState } from 'react';
import {Helmet} from "react-helmet";

// React Router - ES6 modules
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

function Add_editPage(props) {
  let errorStatus = props.errorMesses;
  return (
    <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>{ props.routerSetting.appName + ' - ' + props.routerSetting.currentPage }</title>
      <link rel="canonical" href="http://mysite.com/example" />
    </Helmet>
    <form onSubmit={ props.submitAddMovie }>
      <section className="addRow">
        <div>
          <label htmlFor="addTitle">Titel <span className="errorMessContainer" style={(errorStatus.title.value ===  true)
            ? {display: 'block'} : {display: 'none'} }><p className="errorMessText">{ errorStatus.title.mess }</p></span> <br/>
            <input type="text" id="addTitle" onChange={ props.addMovie }/>
          </label><br/>
        </div>
        <div>
          <label htmlFor="addDirector">Regissör <span className="errorMessContainer" style={(errorStatus.director.value ===  true)
            ? {display: 'block'} : {display: 'none'} }><p className="errorMessText">{ errorStatus.director.mess }</p></span><br/>
            <input type="text" id="addDirector" onChange={ props.addMovie }/>
          </label><br/>
        </div>
      </section>
      <section className="addRow">
        <div>
          <label htmlFor="addDescription">Beskrivning <span className="errorMessContainer" style={(errorStatus.description.value ===  true)
          ? {display: 'block'} : {display: 'none'} }><p className="errorMessText">{ errorStatus.description.mess }</p></span><br/>
            <textarea id="addDescription" onChange={ props.addMovie }></textarea>
          </label>
        </div>
        <div>
          <label htmlFor="addRating">Betyg <span className="errorMessContainer"minLength="1.0" style={(errorStatus.rating.value ===  true)
            ? {display: 'block'} : {display: 'none'} }><p className="errorMessText">{ errorStatus.rating.mess }</p></span><br/>
            <input type="text" id="addRating" onChange={ props.addMovie }/><br/>
          </label>
          <input type="submit" id="formSubmitBtn" value="Lägg till film"/>
        </div>
      </section>
    </form>
    </>
  );
}
export default Add_editPage;
