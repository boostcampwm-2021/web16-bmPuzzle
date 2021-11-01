import React, { useState, useRef, useCallback } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./index.css";
const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Main} exact={true} />
        <Route path="/regpuz" component={Space} exact={true} />
        render=
        {({ location: any }) => (
          <div>
            <h1>ERROR</h1>
            <h2>이 페이지는 존재하지 않습니다.</h2>
          </div>
        )}
      </Switch>
    </Router>
  );
};
export default App;
