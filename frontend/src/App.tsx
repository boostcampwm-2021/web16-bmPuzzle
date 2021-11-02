import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "@components/login";
import RegPuz from "@components/register-puzzle/index";
import GlobalStyles from "@styles/global-style";

const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <Switch>
        <Route path="/" component={Login} exact={true} />
        <Route path="/register" component={RegPuz} exact={true} />
      </Switch>
    </Router>
  );
};

export default App;
