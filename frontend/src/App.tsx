import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import GlobalStyles from "@styles/global-style";
import Login from "@pages/login";
import RegPuz from "@pages/register-puzzle/index";
import Main from "@pages/main/index";

const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <Switch>
        <Route path="/" component={Login} exact={true} />
        <Route path="/register" component={RegPuz} exact={true} />
        <Route path="/main" component={Main} exact={true} />
      </Switch>
    </Router>
  );
};

export default App;
