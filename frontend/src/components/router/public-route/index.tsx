import React from "react";
import { Route, Redirect } from "react-router-dom";
import isLogin from "@js/is-login";

type PublicType = {
  component: Function;
  restricted: boolean;
  path: string;
  exact: boolean;
};

const PublicRoute = (props: PublicType) => {
  const { component: Component, restricted, ...rest } = props;
  const render = (props: PublicType) =>
    isLogin() && restricted ? (
      <Redirect to="/main" />
    ) : (
      <Component {...props} />
    );
  return <Route {...rest} render={() => render(props)} />;
};

export default PublicRoute;
