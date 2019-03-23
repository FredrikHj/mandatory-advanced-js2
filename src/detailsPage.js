import React, { useState } from 'react';
import {Helmet} from "react-helmet";

// React Router - ES6 modules
import {Route, Switch } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";

function DetailsPage(props) {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{ props.routerSetting.appName + ' - ' + props.routerSetting.currentPage }</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <p className="navLinks">Huvudsidan</p>
      <p className="navLinks">Lägga till</p>
    </>
  );
}
export default DetailsPage;
