import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import ButtonUI from "./views/components/Button/Button";
import Home from "./views/screens/Home/Home";
import Navbar from "./views/components/Navbar/Navbar";

class App extends React.Component {
  render() {
    return (
      <>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </>
    );
  }
}

export default withRouter(App);
