import React, { useState } from 'react';
import {Helmet} from "react-helmet";

// React Router - ES6 modules
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

function DetailsPage(props) {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{ props.routerSetting.appName + ' - ' + props.routerSetting.currentPage }</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
    </>
  );
}
export default DetailsPage;
