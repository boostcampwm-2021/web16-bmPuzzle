import React, { useState, useRef, useCallback } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import RegPuz from "@Components/RegPuz/index";
import Header from "./Components/Header/index";

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/temp_header" component={Header} exact={true} />
      </Switch>
    </Router>
  );
};
export default App;
