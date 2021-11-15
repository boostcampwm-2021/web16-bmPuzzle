import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import GlobalStyles from "@styles/global-style";

import PublicRoute from "@components/router/public-route/index";
import PrivateRoute from "@components/router/private-route/index";
import Login from "@pages/login";
import RegPuz from "@pages/register-puzzle/index";
import Main from "@pages/main/index";
import Mypage from "@pages/mypage/index";
import PlayPuzzle from "@pages/play-puzzle/index";
import Ranking from "@pages/ranking/index";

const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <Switch>
        <PublicRoute restricted={true} path="/" component={Login} exact />
        <PrivateRoute path="/main" component={Main} exact />
        <PrivateRoute path="/register" component={RegPuz} exact={true} />
        <PrivateRoute path="/mypage" component={Mypage} exact={true} />
        <PublicRoute
          restricted={false}
          path="/room/:puzzleID/:roomID"
          component={PlayPuzzle}
          exact={true}
        />
        <PrivateRoute path="/ranking" component={Ranking} exact={true} />
      </Switch>
    </Router>
  );
};

export default App;
