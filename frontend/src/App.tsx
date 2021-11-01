import React from "react";
import Login from "./Login";
// eslint-disable-next-line import/extensions
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RegPuz from "./Components/RegPuz/index";

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Login} exact={true} />
        <Route path="/regpuz" component={RegPuz} exact={true} />
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
