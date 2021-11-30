import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogin } from "@js/is-login";

type PrivateType = {
  component: Function;
  path: string;
  exact: boolean;
};

const PrivateRoute = (props: PrivateType) => {
  const { component: Component, ...rest } = props;
  const render = (props: PrivateType) =>
    isLogin() ? <Component {...props} /> : <Redirect to="/" />;
  return <Route {...rest} render={() => render(props)} />;
};

export default PrivateRoute;
