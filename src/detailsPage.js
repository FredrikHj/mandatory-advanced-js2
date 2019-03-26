import React, { useState } from 'react';
import {Helmet} from "react-helmet";

// React Router - ES6 modules
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function DetailsPage(props) {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{ props.routerSetting.appName + ' - ' + props.routerSetting.currentPage }</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="page" style={(this.state.routerSetting.currentPage != 'Details') ? {display: 'none'} : null}>

      </div>
    </>
  );
}
export default DetailsPage;
