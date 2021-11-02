import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "@components/login/login";
import RegPuz from "@components/register-puzzle/index";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Login} exact={true} />
        <Route path="/register" component={RegPuz} exact={true} />
        render=
        {/* {({ location: any }) => (
          <div>
            <h1>ERROR</h1>
            <h2>이 페이지는 존재하지 않습니다.</h2>
          </div>
        )} */}
      </Switch>
    </Router>
  );
};

export default App;
