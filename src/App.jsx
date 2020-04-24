import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import "./App.css";

import ButtonUI from "./views/components/Button/Button";

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>App js</h1>
        <ButtonUI>Button</ButtonUI>
        <ButtonUI type="outlined">Button</ButtonUI>
        <ButtonUI type="textual">Button</ButtonUI>
      </div>
    );
  }
}

export default withRouter(App);
